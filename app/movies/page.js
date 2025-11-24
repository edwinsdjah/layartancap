import React from 'react';
import SectionCarousel from '../Components/SectionCarousel';
import Hero from '../Components/Hero';
import MainWrapper from '../Components/MainWrapper';
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrendingMovieThisWeek,
  getMoviesByGenre,
  getMovieVideo,
  genreIds,
} from '../lib/tmdb/movies';

const page = async () => {
  const dataResultThisWeek = await getTrendingMovieThisWeek();
  const dataNowPlaying = await getNowPlayingMovies();
  const dataTopRated = await getTopRatedMovies();
  const dataActionMovies = await getMoviesByGenre(genreIds.action);
  const dataHorrorMovies = await getMoviesByGenre(genreIds.horror);
  const dataComedyMovies = await getMoviesByGenre(genreIds.comedy);
  const dataFamilyMovies = await getMoviesByGenre(genreIds.family);
  const dataAnimationMovies = await getMoviesByGenre(genreIds.animation);
  const randomIndex = Math.floor(Math.random() * dataResultThisWeek.length);
  const heroMovie = dataResultThisWeek[randomIndex];
  const video = await getMovieVideo(heroMovie.id);
  const trailer = video.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <>
      <Hero movie={heroMovie} trailerKey={trailer?.key} type='movie' />
      <MainWrapper>
        <SectionCarousel
          title='Trending This Week'
          data={dataResultThisWeek.map(item => ({
            ...item,
            type: item.media_type === 'tv' ? 'series' : 'movie',
          }))}
          variant='trending'
        />

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
          title='Kids Will Love It'
          data={dataAnimationMovies}
          variant='landscape'
          type='movie'
        />
        <SectionCarousel
          title='Unstoppable Laugh'
          data={dataComedyMovies}
          variant='landscape'
          type='movie'
        />
        <SectionCarousel
          title='Cozy on Couch'
          data={dataFamilyMovies}
          variant='landscape'
          type='movie'
        />
        <SectionCarousel
          title='Shiver Down to Spine'
          data={dataHorrorMovies}
          variant='landscape'
          type='movie'
        />
      </MainWrapper>
    </>
  );
};

export default page;
