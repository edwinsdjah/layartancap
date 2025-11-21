import React from 'react'
import PlayButton from './PlayButton'

const ModalDetail = ({ movie, isSP, cast, type }) => {
  return (
    <>
      {/* PLAY BUTTON */}
      {type === 'movie' ? <div className={`mb-4 ${isSP ? 'w-full' : 'w-auto'}`}>
        <PlayButton id={movie.id} type={type} fullWidth={isSP} />
      </div> : <></>  }
      

      {/* OVERVIEW + CAST/GENRE */}
      <div
        className={`flex gap-6 mt-4 ${
          isSP ? 'flex-col gap-4' : ''
        }`}
      >
        {/* OVERVIEW */}
        <div
          className={`text-white/80 leading-relaxed ${
            isSP ? '' : 'flex-1'
          }`}
        >
          {movie.overview}
        </div>

        {/* CAST + GENRES */}
        <div
          className={`text-white/70 text-sm space-y-3 ${
            isSP ? 'w-full flex gap-6' : 'w-1/3 flex flex-col'
          }`}
        >
          {/* CAST */}
          <div className={`${isSP ? 'flex-1' : ''}`}>
            <h3 className='font-semibold text-white mb-1'>Cast</h3>
            <p>
              {cast.length > 0
                ? cast.slice(0, 5).map(c => c.name).join(', ')
                : '—'}
            </p>
          </div>

          {/* GENRES */}
          <div className={`${isSP ? 'flex-1' : ''}`}>
            <h3 className='font-semibold text-white mb-1'>Genres</h3>
            <p>
              {movie.genres?.length > 0
                ? movie.genres.map(g => g.name).join(', ')
                : '—'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDetail
