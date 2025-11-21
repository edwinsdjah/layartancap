import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useModal } from '../../context/ModalContext';

const MovieCardPortrait = ({ movie, type, isSP }) => {
  // gunakan poster path (portrait)
  const { openModal } = useModal();
  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-image.jpg';

  return (
    <div
      onClick={() => openModal(movie, type)}
      className={`relative group cursor-pointer ${isSP ?'w-[100%]': 'w-[140px]' } rounded-lg overflow-hidden`}
    >
      {/* IMAGE */}
      <div className='relative h-[225px]'>
        <Image
          src={img}
          alt={type === 'movie' ? movie.title : movie.name}
          fill
          className='object-cover transition duration-300 group-hover:brightness-75 group-hover:scale-105'
        />
      </div>

      {/* TITLE GRADIENT */}
      <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent'>
        <h3 className='text-xs font-semibold text-white truncate'>
          {type === 'movie' ? movie.title : movie.name}
        </h3>
      </div>
    </div>
  );
};

export default MovieCardPortrait;
