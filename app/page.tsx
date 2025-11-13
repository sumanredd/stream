import {
  fetchPopular,
  fetchTopRated,
  fetchNowPlaying,
  fetchComedy,
  fetchDrama,
  fetchSciFi,
  fetchEpicWorlds,
  fetchAnime,
  fetchBollywood,
  fetchTamil,
  fetchTelugu,
  fetchMalayalam,
  fetchKannada
} from '../lib/tmdb'
import HeroCarousel from './components/HeroCarousel'
import MovieRow from './components/MovieRow'
import { MovieListResponse } from '../types/movie'

export default async function Page() {
  const [
    popularRes,
    topRes,
    nowRes,
    comedyRes,
    dramaRes,
    scifiRes,
    epicRes,
    animeRes,
    bollywoodRes,
    tamilRes,
    teluguRes,
    malayalamRes,
    kannadaRes
  ] = await Promise.all([
    fetchPopular(),
    fetchTopRated(),
    fetchNowPlaying(),
    fetchComedy(),
    fetchDrama(),
    fetchSciFi(),
    fetchEpicWorlds(),
    fetchAnime(),
    fetchBollywood(),
    fetchTamil(),
    fetchTelugu(),
    fetchMalayalam(),
    fetchKannada()
  ])

  const popular = (popularRes as MovieListResponse).results || []
  const topRated = (topRes as MovieListResponse).results || []
  const nowPlaying = (nowRes as MovieListResponse).results || []
  const comedy = (comedyRes as MovieListResponse).results || []
  const drama = (dramaRes as MovieListResponse).results || []
  const scifi = (scifiRes as MovieListResponse).results || []
  const epic = (epicRes as MovieListResponse).results || []
  const anime = (animeRes as MovieListResponse).results || []
  const bollywood = (bollywoodRes as MovieListResponse).results || []
  const tamil = (tamilRes as MovieListResponse).results || []
  const telugu = (teluguRes as MovieListResponse).results || []
  const malayalam = (malayalamRes as MovieListResponse).results || []
  const kannada = (kannadaRes as MovieListResponse).results || []

  const topMovies = popular.slice(0, 6)

  return (
    <>
      <HeroCarousel movies={topMovies} />
      <div className="max-w-6xl mx-auto pb-20 space-y-10">
        <MovieRow movies={popular} categoryTitle="Popular" />
        <MovieRow movies={topRated} categoryTitle="Top Rated" />
        <MovieRow movies={nowPlaying} categoryTitle="Now Playing" />
        <MovieRow movies={comedy} categoryTitle="Comedy" />
        <MovieRow movies={drama} categoryTitle="Drama" />
        <MovieRow movies={scifi} categoryTitle="Sci-Fi" />
        <MovieRow movies={epic} categoryTitle="Epic / Fantasy" />
        <MovieRow movies={anime} categoryTitle="Animation / Anime" />
        <MovieRow movies={bollywood} categoryTitle="Bollywood (Hindi)" />
        <MovieRow movies={tamil} categoryTitle="Tamil" />
        <MovieRow movies={telugu} categoryTitle="Telugu" />
        <MovieRow movies={malayalam} categoryTitle="Malayalam" />
        <MovieRow movies={kannada} categoryTitle="Kannada" />
      </div>
    </>
  )
}
