'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDeviceStore } from '../../stores/useDeviceStore';
import { useDebounceCallback } from '../../hooks/useDebounce';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const { isSP } = useDeviceStore();

  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  // Detect click outside input
  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const debouncedNavigate = useDebounceCallback(query => {
    startTransition(() => {
      router.replace(`/search?q=${encodeURIComponent(query)}`);
    });
  }, 300);

  // CLOSE SEARCH → clear + close + go home
  const handleCloseSearch = () => {
    setSearchValue('');
    setSearchOpen(false);
    router.push('/');
  };

  const onChange = e => {
    const v = e.target.value;
    setSearchValue(v);

    // kosong → home
    if (v.trim() === '') {
      router.push('/');
      return;
    }

    // ada isi → navigate ke /search
    debouncedNavigate(v);
  };

  /* ======================
        MOBILE NAV
     ====================== */
  if (isSP) {
    return (
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          flex items-center justify-between
          px-4 h-[55px]
          transition-all duration-300
          ${
            isScrolled
              ? 'bg-black/90 backdrop-blur-sm'
              : 'bg-gradient-to-b from-black/60 to-transparent'
          }
        `}
      >
        {/* LEFT — LOGO */}
        <Link href='/' className='flex items-center z-20'>
          <Image
            src='/logo.png'
            width={65}
            height={40}
            alt='Logo'
            className='w-[65px]'
          />
        </Link>

        {/* CENTER MENU */}
        <div
          className={`
            absolute left-1/2 -translate-x-1/2
            flex items-center gap-6 text-white/80 text-sm
            transition-all duration-300
            ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <Link href='/' className='hover:text-white'>
            Home
          </Link>
          <Link href='/series' className='hover:text-white'>
            Series
          </Link>
          <Link href='/movies' className='hover:text-white'>
            Movies
          </Link>
        </div>

        {/* RIGHT — SEARCH */}
        <div className='flex items-center gap-4 z-20'>
          <div
            ref={searchRef}
            className={`
              relative flex items-center
              transition-all duration-300
              ${searchOpen ? 'w-[60vw] max-w-[320px]' : 'w-[24px]'}
            `}
          >
            <input
              ref={inputRef}
              type='text'
              value={searchValue}
              onChange={onChange}
              placeholder='Search...'
              className={`
                h-[34px] text-white bg-black/70
                border border-white/20
                pl-3 text-[14px] outline-none rounded
                transition-all duration-300
                ${searchOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'}
              `}
            />

            {/* SEARCH ICON */}
            {!searchOpen && (
              <i
                className='bi bi-search text-white text-[20px] absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={toggleSearch}
              ></i>
            )}

            {/* CLOSE ICON */}
            {searchOpen && (
              <i
                className='bi bi-x-lg text-white text-[20px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={handleCloseSearch}
              ></i>
            )}
          </div>

          <Link href='#'>
            <i className='fa fa-user text-white text-[18px]'></i>
          </Link>
        </div>
      </nav>
    );
  }

  /* ======================
        DESKTOP NAV
     ====================== */
  return (
    <nav
      className={`
        fixed w-screen z-[10] px-[57px] h-[80px] flex items-center
        transition-all duration-300
        ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-sm shadow-md'
            : 'bg-transparent'
        }
      `}
    >
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <Link href='/' className='block'>
            <Image
              width={100}
              height={50}
              src='/logo.png'
              alt='Logo'
              className='w-[100px]'
            />
          </Link>

          <section className='flex gap-4'>
            <Link
              href='/'
              className='text-white/60 hover:text-white text-[16px]'
            >
              Home
            </Link>
            <Link
              href='/series'
              className='text-white/60 hover:text-white text-[16px]'
            >
              TV Shows
            </Link>
            <Link
              href='/movies'
              className='text-white/60 hover:text-white text-[16px]'
            >
              Movies
            </Link>
            <Link
              href='#'
              className='text-white/60 hover:text-white text-[16px]'
            >
              News & Popular
            </Link>
            <Link
              href='/list'
              className='text-white/60 hover:text-white text-[16px]'
            >
              List
            </Link>
          </section>
        </div>

        {/* SEARCH */}
        <div className='flex items-center'>
          <div className='relative flex items-center' ref={searchRef}>
            <input
              ref={inputRef}
              type='text'
              value={searchValue}
              onChange={onChange}
              placeholder='Search...'
              className={`
                h-[34px] text-white bg-black/70
                border border-white/20
                pl-3 text-[14px] outline-none rounded
                transition-all duration-300
                ${searchOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'}
              `}
            />

            {/* OPEN SEARCH ICON */}
            {!searchOpen && (
              <i
                className='bi bi-search text-white text-[20px] absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={toggleSearch}
              ></i>
            )}

            {/* CLOSE SEARCH ICON */}
            {searchOpen && (
              <i
                className='bi bi-x-lg text-white text-[20px] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={handleCloseSearch}
              ></i>
            )}
          </div>

          <section className='ml-[20px] w-[30px] h-[30px] rounded cursor-pointer flex items-center justify-center'>
            <Link href='#'>
              <i className='fa fa-user text-white text-[20px]'></i>
            </Link>
          </section>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
