import React from 'react';
import SectionCarousel from '../Components/SectionCarousel';
import {
  genreIds,
  getSeriesByCountry,
  getSeriesByGenre,
  getSeriesVideo,
  getTrendingSeries,
} from '../lib/tmdb/series';
import Hero from '../Components/Hero';
import MainWrapper from '../Components/MainWrapper';

export default async function ListPage() {
  const dataTrendingSeries = await getTrendingSeries();
  const randomIndex = Math.floor(Math.random() * dataTrendingSeries.length);
  const heroSeries = dataTrendingSeries[randomIndex];
  const video = await getSeriesVideo(heroSeries.id);
  const trailer = video.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const dataActionSeries = await getSeriesByGenre(genreIds.action);
  const dataComedySeries = await getSeriesByGenre(genreIds.comedy);
  const dataDramaSeries = await getSeriesByGenre(genreIds.drama);
  const dataHorrorSeries = await getSeriesByGenre(genreIds.horror);
  const dataFamilySeries = await getSeriesByGenre(genreIds.family);
  const dataKDramaSeries = await getSeriesByCountry('KR');
  const dataAnimeSeries = await getSeriesByCountry('JP');

  return (
    <>
      <Hero movie={heroSeries} trailerKey={trailer?.key} type='series' />
      <MainWrapper>
        <SectionCarousel
          title='Recommended TV Series'
          data={dataTrendingSeries}
          variant='trending'
          type='series'
        ></SectionCarousel>
        <SectionCarousel
          title='K-Drama TV Series'
          data={dataKDramaSeries}
          variant='portrait'
          type='series'
        ></SectionCarousel>
        <SectionCarousel
          title='Trending From Japan'
          data={dataAnimeSeries}
          variant='portrait'
          type='series'
        ></SectionCarousel>
        <SectionCarousel
          title='Action TV Series'
          data={dataActionSeries}
          variant='landscape'
          type='series'
        />
        <SectionCarousel
          title='Comedy TV Series'
          data={dataComedySeries}
          variant='landscape'
          type='series'
        />
        <SectionCarousel
          title='Reality TV Series'
          data={dataDramaSeries}
          variant='landscape'
          type='series'
        />
        <SectionCarousel
          title='Horror TV Series'
          data={dataHorrorSeries}
          variant='landscape'
          type='series'
        />
        <SectionCarousel
          title='Family TV Series'
          data={dataFamilySeries}
          variant='landscape'
          type='series'
        />
      </MainWrapper>
    </>
  );
}
