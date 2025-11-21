'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import SimiliarCard from './SimiliarCard';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useModal } from '@/context/ModalContext'; // ⬅️ IMPORT CONTEXT
import { initDeviceDetection } from '@/helpers/detectDevice';
import { useDeviceStore } from '@/stores/useDeviceStore';
import MovieCardPortrait from './MovieCardPortrait';
import ModalDetail from './ModalDetail';
import RuntimeCard from './RuntimeCard';
import SeriesEpisodeSwitcher from './SeriesEpisodeSwitcher';

const Modal = () => {
  const { open, selected: movie, closeModal } = useModal(); // ⬅️ AMBIL DARI CONTEXT
  const isOpen = open;
  const type = movie?.type;
  const [similiar, setSimiliar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const iframeRef = useRef(null);
  const trailerKey = movie?.trailerKey;
  const setIsSP = useDeviceStore(s => s.setIsSP);
  const isSP = useDeviceStore(s => s.isSP);

  useEffect(() => {
    const cleanup = initDeviceDetection(setIsSP);
    return () => cleanup && cleanup();
  }, [setIsSP]);

  // reset state saat movie baru
  useEffect(() => {
    if (!movie) return;
    setVideoReady(false);
    setSimiliar([]);
  }, [movie?.id]);

  useEffect(() => {
    if (trailerKey) {
      const timer = setTimeout(() => setVideoReady(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [movie]);

  // fetch similiar
  useEffect(() => {
    if (!isOpen || !movie?.id) return;

    const fetchSimiliar = async () => {
      setSimiliar([]);
      setLoading(true);

      const endpoint =
        movie.type === 'tv'
          ? `/api/tmdb/tv/${movie.id}/recommendations`
          : `/api/tmdb/movie/${movie.id}/recommendations`;

      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setSimiliar(
          data.results?.filter(item => item.id !== movie.id).slice(0, 12) || []
        );
      } catch (err) {
        console.error('Failed to load similar:', err);
        setSimiliar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimiliar();
  }, [movie?.id, isOpen]);

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
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Unlock scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Kembalikan posisi scroll sebelumnya
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
  if (!isOpen || !movie) return null;

  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/fallback-backdrop.jpg';

  const releaseYear =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || '-';

  const cast = movie.cast || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={movie.id}
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='absolute inset-0' onClick={closeModal}></div>

          <motion.div
            className={`
              relative bg-[#141414] shadow-2xl
              ${
                isSP
                  ? 'w-full h-full rounded-none'
                  : 'w-[90%] max-w-4xl max-h-[90vh] rounded-xl'
              }
              overflow-y-auto
            `}
            initial={{ scale: isSP ? 1 : 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: isSP ? 1 : 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* HEADER VIDEO */}
            <div
              className={`
                ${
                  isSP
                    ? 'sticky top-0 z-20 h-64 rounded-none'
                    : 'relative w-full h-64 rounded-t-xl'
                }
                overflow-hidden
              `}
            >
              <Image
                src={img}
                alt={movie.title || movie.name}
                fill
                className={`object-cover transition-opacity duration-1000 ${
                  videoReady ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {trailerKey && (
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
                    isMuted ? 1 : 0
                  }&controls=0&loop=1&playlist=${trailerKey}`}
                  className={`
                    absolute top-1/2 left-1/2
                    w-[180%] h-[180%]
                    -translate-x-1/2 -translate-y-1/2
                    transition-opacity duration-1000
                    ${videoReady ? 'opacity-100' : 'opacity-0'}
                  `}
                  allow='autoplay; encrypted-media'
                />
              )}

              <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#141414]' />

              <button
                onClick={() => closeModal()}
                className='cursor-pointer absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center z-10'
              >
                ✕
              </button>

              {trailerKey && (
                <button
                  onClick={toggleMute}
                  className='absolute top-3 left-3 flex items-center justify-center p-2 rounded-full bg-black/50 hover:bg-black/70 transition text-white text-lg'
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              )}
            </div>
            {/* CONTENT */}
            <div className='p-3'>
              <h1 className='text-3xl font-bold mb-2'>
                {movie.title || movie.name}
              </h1>
              <div className='flex items-center gap-4 text-white/80 mb-2'>
                <span>{releaseYear}</span>
                <RuntimeCard movie={movie} />
              </div>
              <ModalDetail movie={movie} isSP={isSP} cast={cast} type={type} />
              {type === 'tv' ? (
                <SeriesEpisodeSwitcher id={movie.id} seasons={movie.seasons} />
              ) : (
                <></>
              )}
              <div className='my-6'>
                <h3 className='text-xl font-semibold mb-3'>More like this</h3>

                {loading ? (
                  <div className='flex justify-center items-center py-10'>
                    <div className='w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin' />
                  </div>
                ) : similiar.length === 0 ? (
                  <p className='text-white/50 text-sm'>
                    No similar titles found.
                  </p>
                ) : (
                  <div
                    className={`grid ${
                      isSP
                        ? 'grid-cols-3 gap-2'
                        : 'grid-cols-1 sm:grid-cols-3 gap-3'
                    }`}
                  >
                    {similiar.map(item =>
                      isSP ? (
                        <MovieCardPortrait
                          key={item.id}
                          movie={item}
                          id={item.id}
                          type={type}
                          isSP={isSP}
                        />
                      ) : (
                        <SimiliarCard
                          key={item.id}
                          item={item}
                          id={item.id}
                          type={type}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
