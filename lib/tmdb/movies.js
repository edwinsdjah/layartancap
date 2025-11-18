const { tmdbFetch } = require('./client');

export async function getTrendingMovieThisWeek(limit = 10) {
  const res = await tmdbFetch('/trending/movie/week?language=en-US');
  if (!res || !res.results) return [];
  // limit max result by 10
  return res.results.slice(0, limit);
}
export async function getNowPlayingMovies(limit = 10) {
  const res = await tmdbFetch('/movie/now_playing?language=en-US');
  return res?.results?.slice(0, limit) || [];
}

export async function getTopRatedMovies(limit = 10) {
  const res = await tmdbFetch('/movie/top_rated?language=en-US');
  return res?.results?.slice(0, limit) || [];
}

export async function getMoviesByGenre(genreId, limit = 10) {
  if (!genreId) return [];

  const res = await tmdbFetch(
    `/discover/movie?language=en-US&with_genres=${genreId}`
  );

  return res?.results?.slice(0, limit) || [];
}

export async function getMovieVideo(id) {
  const res = await tmdbFetch(`/movie/${id}/videos?language=en-US`);
  return res?.results || [];
}
