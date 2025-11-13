'use client'
import { Movie } from '../../types/movie'
import MovieCard from './MovieCard'


export default function MovieRow({ movies, categoryTitle }: { movies: Movie[]; categoryTitle: string }) {
    return (
        <section className="px-4 md:px-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">{categoryTitle}</h3>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2">
                {movies.map(m => (
                    <div key={m.id} className="snap-start">
                        <MovieCard movie={m} />
                    </div>
                ))}
            </div>
        </section>
    )
}