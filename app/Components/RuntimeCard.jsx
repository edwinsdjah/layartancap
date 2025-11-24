import React from 'react';

const RuntimeCard = ({ movie }) => {
  const runtime = movie.runtime
    ? `${movie.runtime} min`
    : movie.type === 'tv'
    ? `${movie.number_of_seasons} Seasons`
    : '—';

  return (
    <>
      <span
        className='
      inline-block
      px-[6px] py-[2px]
      text-xs font-bold
      rounded
      border border-white/40
      bg-white/10
      backdrop-blur-sm tracking-wide
      text-white
    '
      >
        {runtime}
      </span>
    </>
  );
};

export default RuntimeCard;
