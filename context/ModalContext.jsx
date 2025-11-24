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
      const ageRatingURL =
        fetchType === 'movie'
          ? `/api/tmdb/movie/${movie.id}/release_dates`
          : `/api/tmdb/tv/${movie.id}/content_ratings`;

      // Fetch parallel biar ngebut
      const [videoRes, detailRes, creditsRes, ratingRes] = await Promise.all([
        fetch(`/api/tmdb/${fetchType}/${movie.id}/videos?language=en-US`),
        fetch(`/api/tmdb/${fetchType}/${movie.id}`),
        fetch(`/api/tmdb/${fetchType}/${movie.id}/credits`),
        fetch(ageRatingURL),
      ]);

      const videoData = await videoRes.json();
      const detail = await detailRes.json();
      const credits = await creditsRes.json();
      const ratingData = await ratingRes.json();

      const trailer = videoData.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      let ageRating = null;

      if (fetchType === 'movie') {
        const results = ratingData?.results || [];

        const grab = iso => {
          const c = results.find(r => r.iso_3166_1 === iso);
          if (!c) return null;
          const rated = c.release_dates?.find(
            r => r.certification && r.certification.trim() !== ''
          );
          return rated?.certification || null;
        };

        ageRating = grab('US') || grab('ID') || null;
      } else {
        // TV series pakai content_ratings
        const results = ratingData?.results || [];

        const grab = iso => {
          const c = results.find(r => r.iso_3166_1 === iso);
          return c?.rating || null;
        };

        ageRating = grab('ID') || grab('US') || null;
      }

      const merged = {
        ...detail,
        cast: credits.cast?.slice(0, 5),
        crew: credits.crew,
        trailerKey: trailer?.key || null,
        ageRating,
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
