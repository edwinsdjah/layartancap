import React from 'react';
import SectionGrid from './SectionGrid';

const SearchResultList = ({ items }) => {
  if (!items) return <div className='text-2xl-white/70'>No results found.</div>;
  return (
    <>
      <SectionGrid
        data={items}
        variant='portrait'
        title='Top Results'
        type=''
      />
    </>
  );
};

export default SearchResultList;
