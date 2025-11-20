'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import SimiliarCard from './SimiliarCard';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Modal = ({ isOpen, movie, type, onClose, trailer }) => {
  const [similiar, setSimiliar] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const iframeRef = useRef(null);

  const trailerKey = movie?.trailerKey;
  // reset state saat movie baru
  useEffect(() => {
    if (!movie) return;
    setVideoReady(false);
    setSimiliar([]);
  }, [movie?.id]);

  useEffect(() => {
    // Fade in video setelah 2.5 detik
    const timer = setTimeout(() => setVideoReady(true), 2500);
    return () => clearTimeout(timer);
  }, [movie]);

  // fetch similiar
  useEffect(() => {
    if (!isOpen || !movie?.genres?.length) return;

    const fetchSimiliar = async () => {
      setSimiliar([]);
      setLoading(true);

      const endpoint =
        type === 'tv'
          ? `/api/tmdb/tv/${movie.id}/recommendations`
          : `/api/tmdb/movie/${movie.id}/recommendations`;

      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setSimiliar(
          data.results
            ?.filter(item => item.id !== movie.id) // exclude movie saat ini
            .slice(0, 9) || []
        );
      } catch (err) {
        console.error('Failed to load similar:', err);
        setSimiliar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimiliar();
  }, [movie?.id, type, isOpen]);

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

  if (!isOpen || !movie) return null;

  const img = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/fallback-backdrop.jpg';

  const releaseYear =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || '-';

  const runtime = movie.runtime
    ? `${movie.runtime} min`
    : type === 'tv'
    ? `${movie.number_of_seasons} Seasons`
    : '—';

  const cast = movie.cast || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={movie.id} // paksa remount tiap movie baru
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='absolute inset-0' onClick={onClose}></div>

          <motion.div
            className='relative w-[90%] max-w-4xl bg-[#141414] rounded-xl max-h-[90vh] overflow-y-auto shadow-2xl'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* HEADER VIDEO */}
            <div className='relative w-full h-64 rounded-t-xl overflow-hidden'>
              {/* BACKDROP IMAGE */}
              <Image
                src={img}
                alt={movie.title || movie.name}
                fill
                className={`object-cover transition-opacity duration-1000 ${
                  videoReady ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* VIDEO TRAILER */}
              {trailerKey && (
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
                    isMuted ? 1 : 0
                  }&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&showinfo=0`}
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

              {/* GRADIENT OVERLAY */}
              <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#141414]' />

              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className='absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-10'
              >
                ✕
              </button>

              {/* MUTE BUTTON */}
              {trailerKey && (
                <button
                  onClick={toggleMute}
                  className='absolute top-3 left-3 flex cursor-pointer items-center justify-center p-2 rounded-full bg-black/50 hover:bg-black/70 transition text-white text-lg'
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              )}
            </div>

            {/* CONTENT */}
            <div className='p-6'>
              <h1 className='text-3xl font-bold mb-2'>
                {movie.title || movie.name}
              </h1>

              <div className='flex items-center gap-4 text-white/80 mb-2'>
                <span>{releaseYear}</span>
                <span className='px-2 py-0.5 border border-white/40 rounded text-xs'>
                  {runtime}
                </span>
              </div>

              <div className='flex gap-6 mt-4'>
                <div className='flex-1 text-white/80 leading-relaxed'>
                  {movie.overview}
                </div>

                <div className='w-1/3 text-white/70 text-sm space-y-3'>
                  <div>
                    <h3 className='font-semibold text-white mb-1'>Cast</h3>
                    <p>
                      {cast.length > 0
                        ? cast
                            .slice(0, 5)
                            .map(c => c.name)
                            .join(', ')
                        : '—'}
                    </p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-white mb-1'>Genres</h3>
                    <p>
                      {movie.genres?.length > 0
                        ? movie.genres.map(g => g.name).join(', ')
                        : '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex gap-3 mb-4'>
                <Link
                  href={`/detail/${movie.id}?${type}=1`}
                  className='bg-white text-black px-6 py-2 font-semibold rounded-md hover:bg-gray-200 transition'
                >
                  Play
                </Link>
              </div>

              {/* More like this */}
              <div className='mb-6'>
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
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                    {similiar.map(item => (
                      <SimiliarCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#141414] to-transparent' />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
