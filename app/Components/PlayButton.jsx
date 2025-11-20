'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { checkSuperembedAvailability } from '../../utils/checkSuperEmbed';

// dynamic import VideoPlayer
const VideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

const PlayButton = ({ id, type = 'movie', className = '' }) => {
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    checkSuperembedAvailability(id, type)
      .then(res => {
        setAvailable(res);
        setLoading(false);
      })
      .catch(() => {
        setAvailable(false);
        setLoading(false);
      });
  }, [id, type]);

  return (
    <>
      {open && (
        <div className='fixed inset-0 bg-black/90 z-[999]'>
          <VideoPlayer id={id} type={type} />
          <button
            onClick={() => setOpen(false)}
            className='absolute top-4 right-4 text-white text-3xl'
          >
            ✕
          </button>
        </div>
      )}

      <button
        disabled={!available || loading}
        onClick={() => setOpen(true)}
        className={`
          flex items-center gap-2 px-6 py-2 rounded-md font-semibold shadow-md transition
          ${
            loading
              ? 'bg-gray-500 cursor-wait text-white'
              : available
              ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
              : 'bg-gray-600 cursor-not-allowed text-white/60'
          }
          ${className}
        `}
      >
        <i className='fa fa-play' />
        {loading ? 'Checking...' : available ? 'Play' : 'Not Available'}
      </button>
    </>
  );
};

export default PlayButton;
