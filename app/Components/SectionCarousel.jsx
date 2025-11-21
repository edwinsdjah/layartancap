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

        <div className='flex gap-2 overflow-x-auto px-2 scrollbar-hide'>
          {data?.map((movie, i) => (
            <div key={movie.id} className='relative flex-shrink-0'>
              {variant === 'trending' && (
               <span className='absolute -left-2 bottom-2 text-[100px] font-extrabold z-10
             text-black [text-shadow:2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white]'>
                {i + 1}
              </span>
              )}

              <CardComponent movie={movie} type={movie.type || type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
