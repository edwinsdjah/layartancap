'use client';
import { createContext, useContext, useState } from 'react';
import Modal from '../app/Components/Modal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = async (movie, type = 'movie') => {
    try {
      setLoading(true);
      setOpen(true);

      const fetchType = type === 'movie' ? 'movie' : 'tv';

      // Fetch parallel biar ngebut
      const [videoRes, detailRes, creditsRes] = await Promise.all([
        fetch(`/api/tmdb/${fetchType}/${movie.id}/videos?language=en-US`),
        fetch(`/api/tmdb/${fetchType}/${movie.id}`),
        fetch(`/api/tmdb/${fetchType}/${movie.id}/credits`),
      ]);

      const videoData = await videoRes.json();
      const detail = await detailRes.json();
      const credits = await creditsRes.json();

      const trailer = videoData.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );

      const merged = {
        ...detail,
        cast: credits.cast?.slice(0, 5),
        crew: credits.crew,
        trailerKey: trailer?.key || null,
        type: fetchType,
      };

      setSelected(merged);
    } catch (err) {
      console.error('Modal fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelected(null);
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        selected,
        loading,
        openModal,
        closeModal,
      }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
