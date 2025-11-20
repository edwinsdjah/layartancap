'use client';
import MovieCardPortrait from './MovieCardPortrait';
import MovieCard from './MovieCard';
import { useState } from 'react';
import Modal from './Modal';

export default function SectionCarousel({
  title,
  data,
  variant = 'portrait',
  type,
}) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const CardComponent =
    variant === 'portrait' || variant === 'trending'
      ? MovieCardPortrait
      : MovieCard;

  const handleSelect = async movie => {
    try {
      let fetchType = type === 'movie' ? 'movie' : 'tv';
      const videoRes = await fetch(
        `/api/tmdb/${fetchType}/${movie.id}/videos?language=en-US`
      );
      const videoData = await videoRes.json();
      const trailer = videoData.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      // Fetch detail
      const detailRes = await fetch(`/api/tmdb/${fetchType}/${movie.id}`);
      const detail = await detailRes.json();
      // Fetch credits
      const creditsRes = await fetch(
        `/api/tmdb/${fetchType}/${movie.id}/credits`
      );
      const credits = await creditsRes.json();
      // Gabung data
      const mergedData = {
        ...detail,
        cast: credits.cast?.slice(0, 5) || [],
        crew: credits.crew || [],
        trailerKey: trailer?.key || null,
      };

      setSelected(mergedData);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className='mb-8 relative'>
      <h2 className='text-2xl font-bold mb-3'>{title}</h2>

      <div className='relative'>
        {/* Fade kiri */}
        <div className='pointer-events-none absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-black via-black/70 to-transparent z-10'></div>

        {/* Fade kanan */}
        <div className='pointer-events-none absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-black via-black/70 to-transparent z-10'></div>

        <div className='flex gap-2 overflow-x-auto px-2 scrollbar-hide'>
          {data?.map((movie, i) => (
            <div key={movie.id} className='relative flex-shrink-0'>
              {/* ONLY for trending */}
              {variant === 'trending' && (
                <span
                  className='
                  absolute -left-5 bottom-2
                  text-[100px] leading-none font-black
                  text-white tracking-tight select-none
                  z-10
                '
                >
                  {i + 1}
                </span>
              )}

              <CardComponent
                movie={movie}
                type={type}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
        <Modal isOpen={open} movie={selected} onClose={() => setOpen(false)} />
      </div>
    </section>
  );
}
