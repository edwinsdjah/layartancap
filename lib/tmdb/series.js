import { tmdbFetch } from './client';

export async function getTrendingSeries(limit = 10) {
  const res = await tmdbFetch(`/tv/popular?language=en-US&page=1`);
  return res?.results?.slice(0, limit) || [];
}
