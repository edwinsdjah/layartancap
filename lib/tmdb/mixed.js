import { tmdbServerFetch } from "./server";

export async function getTrendingMixed(limit = 10) {
  const data = await tmdbServerFetch(`/trending/all/week?language=en-US`);

  if (!data?.results) return [];

  // Ambil hanya movie + tv
  const filtered = data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

  return filtered.slice(0, limit);
}
