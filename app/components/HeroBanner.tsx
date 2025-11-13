import Image from 'next/image'
import { Movie } from '../../types/movie'
import Link from 'next/link'


export default function HeroBanner({ movie }: { movie: Movie | null }) {
    if (!movie) return null
    const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '/fallback.jpg'
    return (
        <section className="relative h-[52vh] md:h-[68vh] w-full">
            <Image src={backdrop} alt={movie.title || movie.name || 'Hero'} fill priority style={{ objectFit: 'cover' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-2xl">
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">{movie.title || movie.name}</h1>
                <p className="mt-3 max-w-xl text-sm md:text-base text-white/90 line-clamp-3">{movie.overview}</p>
                <div className="mt-4 flex gap-3">
                    <Link href={`/movie/${movie.id}`} className="px-4 py-2 rounded bg-white text-black font-semibold">Play</Link>
                    <button className="px-4 py-2 rounded border border-white/20">More Info</button>
                </div>
            </div>
        </section>
    )
}