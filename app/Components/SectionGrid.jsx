'use client';
import MovieCardPortrait from './MovieCardPortrait';
import MovieCard from './MovieCard';
import { useDeviceStore } from '../../stores/useDeviceStore';
import { initDeviceDetection } from '../../helpers/detectDevice';
import { useEffect } from 'react';

export default function SectionGrid({
  title,
  data,
  variant = 'portrait',
  type,
}) {
  const CardComponent =
    variant === 'portrait' || variant === 'trending'
      ? MovieCardPortrait
      : MovieCard;

  const setIsSP = useDeviceStore(s => s.setIsSP);
  const isSP = useDeviceStore(s => s.isSP);

  useEffect(() => {
    const cleanup = initDeviceDetection(setIsSP);
    return () => cleanup && cleanup();
  }, [setIsSP]);

  return (
    <section className='mb-8 relative'>
      <h2 className='text-2xl font-bold mb-3'>{title}</h2>

      {/* Grid updated */}
      <div
        className='grid
        grid-cols-3
        sm:grid-cols-4
        md:grid-cols-5
        lg:grid-cols-7
        xl:grid-cols-7
        gap-2 sm:gap-3 md:gap-3 lg:gap-2 xl:gap-2
        px-2'
      >
        {data?.map((movie, i) => (
          <div key={movie.id} className='relative'>
            {variant === 'trending' && (
              <span
                className='absolute -left-1 bottom-1
                text-[50px] md:text-[80px] lg:text-[100px]
                font-extrabold z-10
                text-black
                [text-shadow:2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white]'
              >
                {i + 1}
              </span>
            )}

            <CardComponent
              movie={movie}
              type={movie.type || type}
              isSP={isSP}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
