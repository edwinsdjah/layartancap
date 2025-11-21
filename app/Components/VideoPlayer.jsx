'use client';
import React, { useState } from 'react';

const VideoPlayer = ({ id, type, season, episode, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='relative w-full h-full flex items-center justify-center bg-black z-[2000]'>
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 z-[2100]
    w-10 h-10 flex items-center justify-center
    text-white text-2xl
    bg-black/50 hover:bg-black/70
    rounded-full transition cursor-pointer'
      >
        ✕
      </button>

      {/* LOADING OVERLAY */}
      {isLoading && (
        <div
          className='absolute inset-0 flex items-center justify-center
          bg-black/60 backdrop-blur-md transition-opacity duration-500 z-[2050]'
        >
          <div
            className='w-12 h-12 border-4 border-red-600 border-t-transparent
            rounded-full animate-spin drop-shadow-[0_0_10px_red]'
          ></div>
        </div>
      )}

      {/* IFRAME */}
      {id ? (
        <iframe
          src={
            type === 'movie'
              ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
              : type === 'series'
              ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
              : 'null'
          }
          className={`w-full h-full transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        ></iframe>
      ) : (
        <h1 className='text-white'>Video Not Found</h1>
      )}
    </div>
  );
};

export default VideoPlayer;
