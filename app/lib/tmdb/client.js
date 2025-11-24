export async function tmdbClientFetch(path) {
  const res = await fetch(`/api/tmdb${path}`, {
    cache: 'no-store',
  });
  return res.json();
}
