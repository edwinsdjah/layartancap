'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { checkSuperembedAvailability } from '../../utils/checkSuperEmbed';

// dynamic import VideoPlayer
const VideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

const PlayButton = ({
  id,
  type = 'movie',
  className = '',
  season,
  episode,
  fullWidth,
}) => {
  const [available, setAvailable] = useState(false);
  const [checking, setChecking] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // === MOVIE: cek di awal seperti biasa ===
  useEffect(() => {
    if (type !== 'movie' || !id) {
      // untuk SERIES → skip cek awal
      setInitialLoading(false);
      return;
    }
    setInitialLoading(true);
    checkSuperembedAvailability(id, type, season, episode)
      .then(res => {
        setAvailable(res);
        setInitialLoading(false);
      })
      .catch(() => {
        setAvailable(false);
        setInitialLoading(false);
      });
  }, [id, type, season, episode]);

  // === CLICK HANDLER ===
  const handleClick = async () => {
    // SERIES: klik dulu → baru cek
    if (type === 'series') {
      setChecking(true);

      const ok = await checkSuperembedAvailability(id, type, season, episode);

      setChecking(false);

      if (!ok) {
        alert('Episode not available.');
        return;
      }

      setOpen(true);
      return;
    }

    // MOVIE: langsung buka karena sudah dicek di awal
    if (available) {
      setOpen(true);
    }
  };

  const disabled = type === 'movie' ? initialLoading || !available : checking; // series hanya disable saat checking

  return (
    <>
      {open && (
        <div className='fixed inset-0 bg-black/90 z-[999]'>
          <VideoPlayer id={id} type={type} season={season} episode={episode} />
          <button
            onClick={() => setOpen(false)}
            className='absolute top-4 right-4 text-white text-3xl'
          >
            ✕
          </button>
        </div>
      )}

      <button
        disabled={disabled}
        onClick={handleClick}
        className={`
          flex items-center gap-2 px-6 py-2 rounded-md font-semibold shadow-md transition
          ${
            disabled
              ? 'bg-gray-600 cursor-not-allowed text-white/60'
              : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
          }
          ${fullWidth ? 'w-full text-center justify-center flex' : ''}
          ${className}
        `}
      >
        <i className='fa fa-play' />
        {type === 'movie' && initialLoading && 'Checking...'}
        {type === 'movie' && !initialLoading && !available && 'Not Available'}
        {type === 'movie' && !initialLoading && available && 'Play'}
        {type === 'series' && (checking ? 'Checking...' : 'Play')}
      </button>
    </>
  );
};

export default PlayButton;
