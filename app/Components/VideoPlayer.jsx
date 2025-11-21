'use client';
import React, { useState } from 'react';

const VideoPlayer = ({ id, type, season, episode }) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log(type);
  return (
    <div className='relative w-full h-full flex items-center justify-center bg-black'>
      {/* LOADING OVERLAY */}
      {isLoading && (
        <div
          className='
          absolute inset-0 flex items-center justify-center
          bg-black/60 backdrop-blur-md
          transition-opacity duration-500
        '
        >
          <div
            className='
            w-12 h-12
            border-4 border-red-600
            border-t-transparent
            rounded-full
            animate-spin
            drop-shadow-[0_0_10px_red]
          '
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
          onLoad={() => setIsLoading(false)} // AUTO HIDE LOADING
        ></iframe>
      ) : (
        <h1 className='text-white'>Video Not Found</h1>
      )}
    </div>
  );
};

export default VideoPlayer;
