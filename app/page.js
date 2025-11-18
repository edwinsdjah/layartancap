import Image from 'next/image';
import {
  getMoviesByGenre,
  getMovieVideo,
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrendingMovieThisWeek,
} from '../lib/tmdb/movies';
import SectionCarousel from './Components/SectionCarousel';
import Hero from './Components/Hero';
import { getTrendingSeries } from '../lib/tmdb/series';

export default async function Home() {
  const dataResultThisWeek = await getTrendingMovieThisWeek();
  const dataNowPlaying = await getNowPlayingMovies();
  const dataTopRated = await getTopRatedMovies();
  const dataActionMovies = await getMoviesByGenre(28);
  const dataTrendingSeries = await getTrendingSeries();
  const randomIndex = Math.floor(Math.random() * dataResultThisWeek.length);
  const heroMovie = dataResultThisWeek[randomIndex];
  const video = await getMovieVideo(heroMovie.id);
  const trailer = video.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <>
      <Hero movie={heroMovie} trailerKey={trailer?.key} />
      <main className='p-6'>
        <SectionCarousel
          title='Trending This Week'
          data={dataResultThisWeek}
          variant='trending'
          type='movie'
        ></SectionCarousel>
        <SectionCarousel
          title='Now Playing'
          data={dataNowPlaying}
          variant='portrait'
          type='movie'
        />
        <SectionCarousel
          title='Top Rated Movies'
          data={dataTopRated}
          variant='landscape'
          type='movie'
        />
        <SectionCarousel
          title='Action Movies'
          data={dataActionMovies}
          variant='landscape'
          type='movie'
        />
        <SectionCarousel
          title='Recommended TV Series'
          data={dataTrendingSeries}
          variant='landscape'
          type='series'
        />
      </main>
    </>
  );
}
