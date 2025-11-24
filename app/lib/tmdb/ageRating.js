// lib/tmdb/getMovieRating.js

import { tmdbServerFetch } from './server';

export async function getMovieRating(movieId) {
  if (!movieId) return null;

  try {
    const data = await tmdbServerFetch(`/movie/${movieId}/release_dates`);

    if (!data?.results) return null;

    const extractCert = iso => {
      const country = data.results.find(r => r.iso_3166_1 === iso);
      if (!country) return null;

      const rated = country.release_dates.find(
        r => r.certification && r.certification.trim() !== ''
      );
      return rated?.certification || null;
    };

    // Prioritas: Indonesia → US → null
    return extractCert('ID') || extractCert('US') || null;
  } catch (err) {
    console.error('Failed to load age rating:', err);
    return null;
  }
}
