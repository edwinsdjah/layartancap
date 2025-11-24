import SearchResultList from '../Components/SearchResultList';
import { tmdbServerFetch } from '../../lib/tmdb/server';

export default async function SearchPage({ searchParams }) {
  const getParams = await searchParams;
  const q = getParams?.q?.trim() || '';

  if (!q) {
    return (
      <main className='min-h-screen pt-[80px] px-4'>
        <div className='max-w-5xl mx-auto text-white/80'>
          Type to search movies & TV shows...
        </div>
      </main>
    );
  }

  let results = [];

  try {
    const data = await tmdbServerFetch(
      `/search/multi?query=${encodeURIComponent(q)}&include_adult=false`
    );

    results = (data?.results || []).filter(
      item => item.media_type === 'movie' || item.media_type === 'tv'
    );
    console.log(results);
  } catch (err) {
    console.error('SSR fetch error:', err);
  }

  return (
    <main className='min-h-screen pt-[80px] px-4'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-white text-xl mb-4'>Search results for “{q}”</h2>
        <SearchResultList items={results} />
      </div>
    </main>
  );
}
