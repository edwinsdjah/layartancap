import React from 'react';
import { useModal } from '../../context/ModalContext';

const InfoButton = ({ movie }) => {
  const { openModal } = useModal();

  return (
    <>
      <div
        onClick={() => openModal(movie)}
        className='flex items-center gap-2 bg-gray-600/60 px-6 py-2 rounded-md
        font-semibold backdrop-blur-md border border-white/20
        hover:bg-gray-600/40 transition'
      >
        <i className='fa fa-info-circle text-sm'></i> More Info
      </div>
    </>
  );
};

export default InfoButton;
