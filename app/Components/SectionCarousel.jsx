'use client';
import MovieCardPortrait from './MovieCardPortrait';
import MovieCard from './MovieCard';

export default function SectionCarousel({
  title,
  data,
  variant = 'portrait',
  type,
}) {
  const CardComponent =
    variant === 'portrait' || variant === 'trending'
      ? MovieCardPortrait
      : MovieCard;

  return (
    <section className='mb-8 relative'>
      <h2 className='text-2xl font-bold mb-3'>{title}</h2>

      <div className='relative'>
        <div className='pointer-events-none absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-black via-black/70 to-transparent z-10'></div>
        <div className='pointer-events-none absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-black via-black/70 to-transparent z-10'></div>

        <div className='flex gap-2 overflow-x-auto px-2 scrollbar-hide'>
          {data?.map((movie, i) => (
            <div key={movie.id} className='relative flex-shrink-0'>
              {variant === 'trending' && (
                <span className='absolute -left-5 bottom-2 text-[100px] font-black text-white z-10'>
                  {i + 1}
                </span>
              )}

              <CardComponent movie={movie} type={type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
