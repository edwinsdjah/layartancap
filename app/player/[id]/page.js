import React from 'react';

const page = async ({ params }) => {
  console.log('PARAMS:', params);
  const { id } = await params;
  return (
    <div className='w-full h-screen pt-[80px]'>
      {id ? (
        <iframe
          src={`https://multiembed.mov/?video_id=${id}&tmdb=1`}
          className='w-full h-full'
          allowFullScreen
        ></iframe>
      ) : (
        <h1>Video Not Found</h1>
      )}
    </div>
  );
};

export default page;
