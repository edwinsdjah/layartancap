import { tmdbServerFetch } from './server';

export async function getTrendingMovieThisWeek(limit = 10) {
  const res = await tmdbServerFetch('/trending/movie/week?language=en-US');
  return res?.results?.slice(0, limit) || [];
}

export async function getNowPlayingMovies(limit = 10) {
  const res = await tmdbServerFetch('/movie/now_playing?language=en-US');
  return res?.results?.slice(0, limit) || [];
}

export async function getTopRatedMovies(limit = 10) {
  const res = await tmdbServerFetch('/movie/top_rated?language=en-US');
  return res?.results?.slice(0, limit) || [];
}

export async function getMoviesByGenre(genreId, limit = 10) {
  const res = await tmdbServerFetch(
    `/discover/movie?language=en-US&with_genres=${genreId}`
  );
  return res?.results?.slice(0, limit) || [];
}

export async function getMovieVideo(id) {
  const res = await tmdbServerFetch(`/movie/${id}/videos?language=en-US`);
  return res?.results || [];
}
