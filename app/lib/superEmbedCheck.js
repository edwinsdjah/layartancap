export async function checkSuperembedAvailability(id, type) {
  if (!id) return false;

  const url =
    type === 'movie'
      ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
      : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=1&e=1`;

  try {
    const res = await fetch(url, { method: 'GET' });

    return res.ok; // TRUE kalau status 200
  } catch (error) {
    return false;
  }
}
