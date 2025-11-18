export async function tmdbFetch(endpoint) {
  try {
    const res = await fetch(`http://api.themoviedb.org/3${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        next: { revalidate: 0 },
      },
    });
    if (!res.ok) {
      console.error('TMDB ERROR', await res.text());
      throw new Error();
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
