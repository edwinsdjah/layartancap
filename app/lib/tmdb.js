export async function getTrendingMovie() {
  try {
    const res = await fetch(
      'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.log('TMDB ERROR:', await res.text());
      throw new Error('Failed to fetch TMDB');
    }

    return res.json();
  } catch (error) {
    console.error('FETCH ERROR →', error);
    return null;
  }
}
