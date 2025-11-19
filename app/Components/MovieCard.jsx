import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MovieCard = ({ movie, type }) => {
  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : '/no-image.jpg';
  return (
    <Link href={`/player/${movie.id}?tmdb=1`}>
      <div className='relative group cursor-pointer rounded-xl overflow-hidden'>
        <Image
          src={img}
          alt={type === 'movie' ? movie.title : movie.name}
          width={150}
          height={50}
          className='w-full h-40 object-cover transition duration-300 group-hover:brightness-75 group-hover:scale-105'
        />

        <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent'>
          <h3 className='text-sm font-semibold text-white'>
            {type === 'movie' ? movie.title : movie.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
