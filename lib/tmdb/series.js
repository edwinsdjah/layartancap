import { tmdbFetch } from './client';

export const genreIds = {
  action: 10759,
  drama: 10764,
  comedy: 35,
  horror: 9648,
  family: 10751,
};

export async function getTrendingSeries(limit = 10) {
  const res = await tmdbFetch(`/tv/popular?language=en-US&page=1`);
  return res?.results?.slice(0, limit) || [];
}

export async function getSeriesByGenre(genre, limit = 10) {
  // Map genre string ke genre ID yang digunakan oleh TMDB API
  if (!genre) {
    throw new Error('Invalid genre');
  }

  // Fetch series berdasarkan genre ID
  const res = await tmdbFetch(
    `/discover/tv?with_genres=${genre}&language=en-US&page=1`
  );

  return res?.results?.slice(0, limit) || [];
}
