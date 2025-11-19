'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Hero = ({ movie, trailerKey }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);
  const [isAvailable, setIsAvailable] = useState(false);
  async function getSuperembedVid() {
    try {
      const res = await fetch(
        `https://layartancap.vercel.app/se_player.php?video_id=${movie.id}&tmdb=1`
      );
      if (res) {
        setIsAvailable(true);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Fade in video setelah 2.5 detik
    getSuperembedVid();
    const timer = setTimeout(() => setShowVideo(true), 2500);
    return () => clearTimeout(timer);
  }, [movie]);

  if (!movie) return null;

  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
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

  return (
    <div className='relative w-full h-screen text-white overflow-hidden'>
      {/* BACKDROP IMAGE */}
      <Image
        src={img}
        alt={movie.title}
        fill
        className={`object-cover transition-opacity duration-1000 ${
          showVideo ? 'opacity-0' : 'opacity-100'
        }`}
        priority
      />

      {/* VIDEO TRAILER */}
      {trailerKey && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
            isMuted ? 1 : 0
          }&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&showinfo=0`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
          allow='autoplay; encrypted-media'
        />
      )}

      {/* GRADIENT OVERLAY */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent' />

      {/* HERO CONTENT */}
      <div className='absolute bottom-[20%] left-6 md:left-12 max-w-2xl z-20'>
        <h1 className='text-4xl md:text-6xl font-bold drop-shadow-lg mb-4'>
          {movie.title}
        </h1>
        <p className='text-sm md:text-lg text-white/80 max-w-xl line-clamp-3 mb-6'>
          {movie.overview}
        </p>

        <div className='flex gap-3 items-center'>
          <Link
            href={isAvailable ? 'OK' : 'NOT OK'}
            className='flex items-center gap-2 bg-white text-black px-6 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 transition'
          >
            <i className='fa fa-play text-sm'></i> Play
          </Link>

          <Link
            href={`/movie/${movie.id}`}
            className='flex items-center gap-2 bg-gray-600/60 px-6 py-2 rounded-md font-semibold backdrop-blur-md border border-white/20 hover:bg-gray-600/40 transition'
          >
            <i className='fa fa-info-circle text-sm'></i> More Info
          </Link>

          {/* MUTE/UNMUTE BUTTON */}
          <button
            onClick={toggleMute}
            className='flex cursor-pointer items-center justify-center p-3 rounded-full bg-black/50 hover:bg-black/70 transition text-white text-xl'
          >
            {isMuted ? (
              <FaVolumeMute className='transition-transform duration-300' />
            ) : (
              <FaVolumeUp className='transition-transform duration-300' />
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className='absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent' />
    </div>
  );
};

export default Hero;
