'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import InfoButton from './InfoButton';
import PlayButton from './PlayButton';
import { useDeviceStore } from '@/stores/useDeviceStore';
import { initDeviceDetection } from '@/helpers/detectDevice';

const Hero = ({ movie, trailerKey, type }) => {
  const setIsSP = useDeviceStore(state => state.setIsSP);
  const isSP = useDeviceStore(state => state.isSP);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!movie) return;
    const cleanup = initDeviceDetection(setIsSP);
    if (trailerKey) {
      const timer = setTimeout(() => setShowVideo(true), 2500);
      return () => clearTimeout(timer);
    }
    return () => cleanup && cleanup();
  }, [movie, setIsSP]);

  if (!movie) return null;

  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/no-image.jpg';
  const portrait = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-image.jpg';

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: isMuted ? 'unMute' : 'mute',
          args: [],
        }),
        '*'
      );
    }
  };

  if (isSP) {
    return (
      <div className='relative w-full flex flex-col items-center pt-24 pb-12 text-white'>
        {/* BACKGROUND GRADIENT (SP ONLY) */}
        <div
          className='absolute inset-0
        bg-gradient-to-t
        from-black
        via-[#111]
        to-[#1c1c1c]
        opacity-90
        pointer-events-none'
        />

        {/* POSTER */}
        <div className='w-[70vw] relative'>
          <Image
            src={portrait}
            alt={movie.title || movie.name}
            width={500}
            height={750}
            className='rounded-2xl shadow-xl object-cover w-full h-auto mx-auto'
          />
        </div>

        {/* BUTTONS */}
        <div className='flex gap-3 mt-6 relative'>
          <PlayButton
            id={movie.id}
            type={type}
            season={type === 'series' ? '1' : ''}
            episode={type === 'series' ? '1' : ''}
          />

          <InfoButton movie={movie} type={type} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative w-full ${
          isSP ? `h-130` : `h-screen`
        } text-white overflow-hidden`}
      >
        {/* BACKDROP IMAGE */}
        <Image
          src={img}
          alt={type === 'movie' ? movie.title : movie.name}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
          priority
        />

        {/* TRAILER */}
        {trailerKey && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
              isMuted ? 1 : 0
            }&controls=0&loop=1&playlist=${trailerKey}`}
            className={`
              absolute top-1/2 left-1/2
              w-[120%] h-[120%]
              -translate-x-1/2 -translate-y-1/2
              transition-opacity duration-1000
              ${showVideo ? 'opacity-100' : 'opacity-0'}
            `}
            allow='autoplay; encrypted-media'
          />
        )}

        {/* GRADIENT */}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />

        {/* CONTENT */}
        <div className='absolute bottom-[20%] left-6 md:left-12 max-w-2xl z-20'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            {type === 'movie' ? movie.title : movie.name}
          </h1>
          <p className='text-sm md:text-lg text-white/80 max-w-xl line-clamp-3 mb-6'>
            {movie.overview}
          </p>

          <div className='flex gap-3 items-center'>
            <PlayButton
              id={movie.id}
              type={type}
              season={type === 'series' ? '1' : ''}
              episode={type === 'series' ? '1' : ''}
            />

            <InfoButton movie={movie} type={type} />

            {/* MUTE BUTTON */}
            <button
              onClick={toggleMute}
              className='flex cursor-pointer items-center justify-center p-3 rounded-full bg-black/50 hover:bg-black/70 text-white text-xl'
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
