export async function GET() {
  try {
    const res = await fetch('https://api.themoviedb.org/3/configuration', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data, null, 2), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
