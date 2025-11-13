'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '../../types/movie'

type Props = { movies: Movie[] }

export default function HeroCarousel({ movies }: Props) {
 
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 3500,
      stopOnInteraction: false, 
      stopOnMouseEnter: true
    }) as any
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const api = emblaApi
    api.on('select', onSelect)
    onSelect()
    return () => {
      if (!api) return
      api.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const handleMouseEnter = () => autoplay?.stop?.()
  const handleMouseLeave = () => autoplay?.reset?.()

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
    autoplay?.reset?.() 
  }, [emblaApi, autoplay])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
    autoplay?.reset?.()
  }, [emblaApi, autoplay])

  const scrollTo = useCallback((i: number) => {
    emblaApi?.scrollTo(i)
    autoplay?.reset?.()
  }, [emblaApi, autoplay])

  return (
    <section
      className="relative w-full overflow-hidden pt-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {movies.map((movie) => {
            const src = movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : '/fallback.jpg'
            return (
              <div
                key={movie.id}
                className="relative flex-[0_0_100%] bg-black min-h-[60vh] md:min-h-[60vh] lg:min-h-[70vh] overflow-hidden"
              >
                <Image
                  src={src}
                  alt="banner"
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-auto max-w-2xl">
                  <h2 className="text-2xl md:text-4xl font-bold text-white">{movie.title}</h2>
                  <p className="mt-2 text-sm md:text-base text-white/90 line-clamp-3 max-w-lg">{movie.overview}</p>
                  <div className="mt-4 flex gap-3">
                    <Link href={`/movie/${movie.id}`} className="px-4 py-2 rounded bg-white text-black font-semibold">Play</Link>
                    <button className="px-4 py-2 rounded border border-white/20 text-white">More Info</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button aria-label="Previous" onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full">
        ‹
      </button>
      <button aria-label="Next" onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-2 rounded-full">
        ›
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex gap-2">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full ${i === selectedIndex ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
