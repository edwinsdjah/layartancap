import React from 'react';
import VideoPlayer from '../../Components/VideoPlayer';

export default async function Page({ params, searchParams }) {
  // Harus di-await sebelum dipakai
  // Jangan destructuring langsung di dalam await
  const _params = await params;
  const _search = await searchParams;
  const { id } = _params;
  const type = _search.movie ? 'movie' : _search.series ? 'series' : null;

  return (
    <div className='w-full h-screen pt-[80px]'>
      <VideoPlayer id={id} type={type} />
    </div>
  );
}
