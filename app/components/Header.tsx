'use client'
import Link from 'next/link'


export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-40 h-16 bg-black/60 backdrop-blur-md border-b border-white/10">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-2xl font-bold">Stream</Link>
                    <ul className="hidden md:flex gap-4 text-sm opacity-90">
                        <li>Home</li>
                        <li>Movies</li>
                        <li>TV</li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    <input placeholder="Search" className="hidden md:block bg-white/6 px-3 py-1 rounded text-sm placeholder:text-white/60" />
                    <button className="text-sm px-3 py-1 border border-white/6 rounded">Sign In</button>
                </div>
            </nav>
        </header>
    )
}