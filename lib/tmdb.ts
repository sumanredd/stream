const BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function handleRes(res: Response) {
  if (!res.ok) throw new Error('TMDB fetch failed')
  return res.json()
}


export async function fetchPopular() {
  const res = await fetch(
    `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchTopRated() {
  const res = await fetch(
    `${BASE}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchNowPlaying() {
  const res = await fetch(
    `${BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}



export async function fetchComedy() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchDrama() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_genres=18&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchSciFi() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchEpicWorlds() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_genres=14&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchAnime() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_genres=16&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}


export async function fetchBollywood() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_original_language=hi&region=IN&sort_by=popularity.desc`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchTamil() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_original_language=ta&region=IN&sort_by=popularity.desc`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchTelugu() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_original_language=te&region=IN&sort_by=popularity.desc`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchMalayalam() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_original_language=ml&region=IN&sort_by=popularity.desc`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchKannada() {
  const res = await fetch(
    `${BASE}/discover/movie?api_key=${API_KEY}&with_original_language=kn&region=IN&sort_by=popularity.desc`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}



export async function fetchMovieById(id: string) {
  const res = await fetch(
    `${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}
export async function fetchSimilarMovies(id: string) {
  const res = await fetch(
    `${BASE}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}

export async function fetchRecommendedMovies(id: string) {
  const res = await fetch(
    `${BASE}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    { cache: 'force-cache' }
  )
  return handleRes(res)
}
