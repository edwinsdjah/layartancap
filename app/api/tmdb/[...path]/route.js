import { NextResponse } from 'next/server';

export async function GET(req, ctx) {
  // ⬅️ params adalah Promise di Next.js terbaru
  const { path } = await ctx.params;

  if (!path || !Array.isArray(path)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  // join [...path] → "movie/123/credits"
  const fullPath = path.join('/');
  const url = `https://api.themoviedb.org/3/${fullPath}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `TMDB error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
