import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  fetchMovieById,
  fetchSimilarMovies,
  fetchRecommendedMovies
} from "../../../lib/tmdb"
import MovieRow from "../../components/MovieRow"

export default async function MoviePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {
  const resolved = (await params) as { id: string }
  const id = resolved?.id

  if (!id) notFound()

  let movie: any
  let similarRes: any = null
  let recommendedRes: any = null

  try {
    movie = await fetchMovieById(id)
    ;[similarRes, recommendedRes] = await Promise.all([
      fetchSimilarMovies(id).catch((e) => {
        console.error("fetchSimilarMovies failed:", e)
        return null
      }),
      fetchRecommendedMovies(id).catch((e) => {
        console.error("fetchRecommendedMovies failed:", e)
        return null
      })
    ])
  } catch (err: any) {
    console.error("Movie detail fetch failed:", err)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-neutral-800 p-6 rounded max-w-md text-white">
          <h2 className="text-lg font-semibold mb-2">Movie unavailable</h2>
          <p className="text-sm mb-3">Could not load details. The API returned an error.</p>
          <pre className="text-xs bg-black/40 p-2 rounded overflow-auto">
            {String(err?.message ?? err)}
          </pre>
          <Link href="/" className="inline-block text-sm underline mt-4">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback-poster.png"

  const backdrop = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null

  const similarMovies = (similarRes && similarRes.results) || []
  const recommendedMovies = (recommendedRes && recommendedRes.results) || []

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      {backdrop && (
        <div className="relative h-56 md:h-85 w-full">
          <Image
            src={backdrop}
            alt={movie?.title ?? "Backdrop"}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 pb-20">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full">
            <div className="rounded overflow-hidden shadow-lg">
              <Image
                src={poster}
                alt={movie?.title ?? "Poster"}
                width={500}
                height={750}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div className="md:flex-1">
            <Link href="/" className="text-sm inline-block mb-4 text-white/70">
              ← Back
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold">{movie?.title}</h1>

            <div className="text-sm text-white/70 mt-2 flex flex-wrap gap-2">
              <span>{movie?.release_date || "Unknown"}</span>
              <span>•</span>
              <span>{movie?.runtime ? `${movie.runtime} min` : "Runtime N/A"}</span>
              <span>•</span>
              <span>{movie?.vote_average ? `${movie.vote_average}/10` : "Rating N/A"}</span>
            </div>

            <p className="mt-4 text-white/90 text-sm md:text-base">
              {movie?.overview || "No description available."}
            </p>

            {movie?.genres?.length > 0 && (
              <div className="mt-6 flex gap-2 flex-wrap">
                {movie.genres.map((g: any) => (
                  <span key={g.id} className="px-3 py-1 bg-white/10 rounded text-sm">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {movie?.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-white text-black px-4 py-2 rounded font-medium"
              >
                Official Site
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 grid gap-3 text-sm">
          <div>
            <span className="font-semibold">Status:</span> {movie?.status || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Original Language:</span>{" "}
            {movie?.original_language || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Budget:</span>{" "}
            {movie?.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
          </div>
          <div>
            <span className="font-semibold">Revenue:</span>{" "}
            {movie?.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
          </div>
        </div>

       
        {similarMovies.length > 0 && (
          <section className="mt-12">
            <h3 className="text-xl font-semibold mb-4">You might also like</h3>
            <MovieRow movies={similarMovies} categoryTitle="" />
          </section>
        )}

        
        {recommendedMovies.length > 0 && (
          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Recommended for you</h3>
            <MovieRow movies={recommendedMovies} categoryTitle="" />
          </section>
        )}
      </div>
    </div>
  )
}
