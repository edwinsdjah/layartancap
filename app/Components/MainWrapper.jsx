'use client'
import { initDeviceDetection } from '@/helpers/detectDevice'
import { useDeviceStore } from '@/stores/useDeviceStore'
import React, { useEffect } from 'react'

const MainWrapper = ({ children }) => {
  const setIsSP = useDeviceStore((s) => s.setIsSP);
  const isSP = useDeviceStore((s) => s.isSP);

  useEffect(() => {
    const cleanup = initDeviceDetection(setIsSP);
    return () => cleanup && cleanup();
  }, [setIsSP]);

  return (
    <main className={isSP ? 'px-3' : 'p-6'}>
      {children}
    </main>
  );
};

export default MainWrapper;
