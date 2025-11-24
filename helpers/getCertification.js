export function getMovieCertification(movie, country = 'US') {
  const results = movie?.release_dates?.results || [];
  const entry = results.find(r => r.iso_3166_1 === country);

  if (!entry || !entry.release_dates?.length) return null;

  // Cari rating yang tidak kosong
  const rated = entry.release_dates.find(r => r.certification?.trim() !== '');
  return rated?.certification || null;
}

export function getTVCertification(movie, country = 'US') {
  const list = movie?.content_ratings?.results || [];
  const entry = list.find(r => r.iso_3166_1 === country);
  return entry?.rating || null;
}
