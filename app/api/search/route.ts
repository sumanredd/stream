import { NextResponse } from 'next/server'

const BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  if (!q || q.trim().length < 1) {
    return NextResponse.json({ results: [] })
  }

  const url = `${BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(q)}&page=1&include_adult=false`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      return new NextResponse(text, { status: res.status })
    }
    const data = await res.json()
    // return only minimal fields needed on client
    const trimmed = {
      results: (data.results || []).map((m: any) => ({
        id: m.id,
        title: m.title,
        poster_path: m.poster_path,
        release_date: m.release_date
      }))
    }
    return NextResponse.json(trimmed)
  } catch (err) {
    console.error('Search API error', err)
    return NextResponse.json({ results: [] })
  }
}
