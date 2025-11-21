import React from 'react'

const RuntimeCard = ({movie}) => {
    const runtime = movie.runtime
    ? `${movie.runtime} min`
    : movie.type === 'tv'
    ? `${movie.number_of_seasons} Seasons`
    : '—';

  return (
    <><span className='px-2 py-0.5 border border-white/40 rounded text-xs'>{runtime}</span></>
  )
}

export default RuntimeCard