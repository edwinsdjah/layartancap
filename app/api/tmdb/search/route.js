import { NextResponse } from 'next/server';
import { tmdbServerFetch } from '../../../lib/tmdb/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const getParams = await searchParams;
    const q = searchParams.get('q')?.trim() || '';

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    // Fetch ke TMDB tapi lewat helper server (aman)
    const data = await tmdbServerFetch(
      `/search/multi?query=${encodeURIComponent(q)}&include_adult=false`
    );

    // Filter biar cuma movie & tv
    const filtered = (data?.results || []).filter(
      item => item.media_type === 'movie' || item.media_type === 'tv'
    );

    return NextResponse.json({
      results: filtered,
    });
  } catch (err) {
    console.error('Search API error:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
