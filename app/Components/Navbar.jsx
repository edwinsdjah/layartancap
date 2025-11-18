'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⭐ Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
      fixed w-screen z-[1000] px-[57px] h-[80px] flex items-center
      transition-all duration-300
      ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }
    `}
    >
      <div className='w-full flex justify-between items-center'>
        {/* LEFT */}
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

          {/* NAV LINKS */}
          <section className='flex gap-4'>
            <Link
              href='/'
              className='text-white/60 hover:text-white text-[13px]'
            >
              Home
            </Link>
            <Link
              href='/series'
              className='text-white/60 hover:text-white text-[13px]'
            >
              TV Shows
            </Link>
            <Link
              href='#'
              className='text-white/60 hover:text-white text-[13px]'
            >
              Movies
            </Link>
            <Link
              href='#'
              className='text-white/60 hover:text-white text-[13px]'
            >
              News & Popular
            </Link>
            <Link
              href='/list'
              className='text-white/60 hover:text-white text-[13px]'
            >
              List
            </Link>
          </section>
        </div>

        {/* RIGHT */}
        <div className='flex items-center'>
          {/* SEARCH BOX WRAPPER */}
          <div className='relative flex items-center' ref={searchRef}>
            {/* SEARCH INPUT */}
            <input
              ref={inputRef}
              type='text'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder='Search by Movie name'
              className={`
                h-[34px] text-white bg-black/60
                ${searchOpen ? 'border-white/20' : 'border-transparent'}
                border pl-[35px] text-[16px] outline-none rounded
                transition-all duration-300 ease-in-out
                ${searchOpen ? 'w-[250px] opacity-100' : 'w-0 opacity-0'}
              `}
            />

            {/* SEARCH ICON */}
            <i
              className='bi bi-search text-white text-[20px] absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer'
              onClick={toggleSearch}
            ></i>
          </div>

          {/* USER ICON */}
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
