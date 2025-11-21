export async function checkSuperembedAvailability(
  id,
  type = 'movie',
  season,
  episode
) {
  if (!id) return false;

  const url =
    type === 'movie'
      ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
      : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;

  try {
    const res = await fetch(url, { method: 'HEAD', mode: 'no-cors' });

    // HEAD + no-cors tidak bisa baca status, jadi:
    // kalau request berhasil dikirim → dianggap available
    return true;
  } catch (e) {
    return false;
  }
}
