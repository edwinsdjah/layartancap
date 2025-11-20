import { useModal } from '@/context/ModalContext';
import Image from 'next/image';
import React from 'react';


const SimiliarCard = ({ item, id, type }) => {
  const {openModal} = useModal();
  const imgUrl = item.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
    : '/fallback-backdrop.jpg';

  const releaseYear =
    item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || '-';

  return (
    <div onClick={()=> {openModal(item, type)}} className='bg-gray-600 rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition'>
      {/* BACKDROP IMAGE */}
      <div className='relative w-full h-40 sm:h-48'>
        <Image
          src={imgUrl}
          alt={item.title || item.name || 'no'}
          fill
          className='object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105'
        />
      </div>

      {/* TITLE + YEAR + DESCRIPTION */}
      <div className='mt-2 px-3 pb-3 flex flex-col gap-1'>
        <h3 className='text-white font-bold text-lg truncate'>
          {item.title || item.name || 'Untitled'}
        </h3>
        <span className='text-white/70 text-sm'>{releaseYear}</span>
        <p className='text-white/60 text-sm line-clamp-3'>
          {item.overview || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default SimiliarCard;
