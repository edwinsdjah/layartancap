import React from 'react';
import SectionCarousel from '../Components/SectionCarousel';
import {
  genreIds,
  getSeriesByGenre,
  getTrendingSeries,
} from '../../lib/tmdb/series';

const list = async () => {
  const dataTrendingSeries = await getTrendingSeries();
  const dataActionSeries = await getSeriesByGenre(genreIds.action);
  const dataComedySeries = await getSeriesByGenre(genreIds.comedy);
  const dataDramaSeries = await getSeriesByGenre(genreIds.drama);
  const dataHorrorSeries = await getSeriesByGenre(genreIds.horror);
  const dataFamilySeries = await getSeriesByGenre(genreIds.family);

  return (
    <main className='p-6 pt-[80px]'>
      <SectionCarousel
        title='Recommended TV Series'
        data={dataTrendingSeries}
        variant='landscape'
        type='series'
      />
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
    </main>
  );
};

export default list;
