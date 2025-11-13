import Link from 'next/link'
import Image from 'next/image'
import { Movie } from '../../types/movie'


export default function MovieCard({ movie }: { movie: Movie }) {
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '/fallback-poster.png'
    return (
        <Link href={`/movie/${movie.id}`} className="min-w-[120px] sm:min-w-[150px] md:min-w-[180px] block">
            <div className="rounded-md overflow-hidden shadow-md">
                <Image src={poster} alt={movie.title || movie.name || 'Poster'} width={300} height={450} style={{ width: '100%', height: 'auto' }} priority={false} />
            </div>
            <h4 className="mt-2 text-sm md:text-sm line-clamp-2">{movie.title || movie.name}</h4>
        </Link>
    )
}