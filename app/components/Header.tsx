'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [open, setOpen] = useState(false) // results dropdown
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false) // mobile full-width search
  const [loading, setLoading] = useState(false)
  const boxRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    function handleClick(e: any) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false)
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

 
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    setLoading(true)
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!r.ok) throw new Error('search failed')
        const data = await r.json()
        setResults(data.results || [])
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(t)
  }, [query])


  function handleSelect() {
    setQuery('')
    setOpen(false)
    setMobileSearchOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
       
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold">Stream</Link>

          <ul className="hidden md:flex gap-4 text-sm opacity-90">
            <Link href="/"><li className="cursor-pointer">Home</li></Link>
            <Link href="/movies"><li className="cursor-pointer">Movies</li></Link>
            <Link href="/tv"><li className="cursor-pointer">TV</li></Link>
          </ul>
        </div>

       
        <div className="flex items-center gap-4">
          {/* Desktop search (visible md+) */}
          <div ref={boxRef} className="relative hidden md:block w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length && setOpen(true)}
              placeholder="Search..."
              className="
                w-full
                bg-neutral-800
                border border-neutral-700
                px-3 py-2 rounded-md text-sm text-white
                placeholder:text-neutral-400
                focus:outline-none focus:border-neutral-500
                transition
              "
            />
            {open && (
              <SearchResults results={results} loading={loading} onSelect={handleSelect} />
            )}
          </div>

      
          <button className="hidden md:inline-block text-sm px-3 py-1 border border-white/20 rounded">
            Sign In
          </button>

       
          <button
            className="md:hidden text-xl p-1"
            aria-label="Open search"
            onClick={() => {
              setMobileSearchOpen((v) => !v)
              setOpen(false)
             
            }}
          >
            🔍
          </button>
        </div>
      </nav>

    
      <div
        className={`md:hidden w-full bg-black/70 border-t border-white/5 overflow-hidden ${
          mobileSearchOpen ? 'animate-slide-down' : 'hidden'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3" ref={boxRef}>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length && setOpen(true)}
              placeholder="Search for movies..."
              className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md text-sm text-white placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              className="text-sm px-3 py-1 border border-white/10 rounded"
              onClick={() => { setQuery(''); setOpen(false); setMobileSearchOpen(false) }}
            >
              Cancel
            </button>
          </div>

          {open && (
            <div className="mt-2">
              <SearchResults results={results} loading={loading} onSelect={handleSelect} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


function SearchResults({ results, loading, onSelect }: any) {
  return (
    <div className="absolute left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded shadow-lg max-h-[60vh] overflow-auto z-50">
      {loading && <div className="p-3 text-sm text-white/60">Searching...</div>}

      {!loading && results.length === 0 && (
        <div className="p-3 text-sm text-white/60">No results</div>
      )}

      <ul className="p-2 space-y-2">
        {results.map((m: any) => {
          const poster = m.poster_path ? `https://image.tmdb.org/t/p/w154${m.poster_path}` : '/fallback-poster.png'
          return (
            <Link
              key={m.id}
              href={`/movie/${m.id}`}
              className="flex gap-3 p-2 rounded hover:bg-white/5"
              onClick={onSelect}
            >
              <div className="w-10 h-14 relative rounded overflow-hidden bg-black">
                <Image src={poster} alt={m.title} fill style={{ objectFit: 'cover' }} />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium">{m.title}</span>
                <span className="text-xs text-white/60">{m.release_date || ''}</span>
              </div>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
