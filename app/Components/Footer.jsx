'use client';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black text-white pt-10 pb-6'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* GRID LINKS */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 text-sm sm:text-base'>
          <ul className='space-y-2 font-semibold tracking-wide'>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Audio and Subtitle
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Media Center
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Privacy
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Contact Us
            </li>
          </ul>
          <ul className='space-y-2 font-semibold tracking-wide'>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Audio Description
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Investor Relation
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Terms and Conditions
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Legal Notices
            </li>
          </ul>
          <ul className='space-y-2 font-semibold tracking-wide'>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Help Center
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Jobs
            </li>
          </ul>
          <ul className='space-y-2 font-semibold tracking-wide'>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Gift Card
            </li>
            <li className='hover:text-gray-400 transition cursor-pointer'>
              Subscription
            </li>
          </ul>
        </div>

        {/* DIVIDER */}
        <div className='border-t border-gray-800 mb-6'></div>

        {/* SOCIAL ICONS */}
        <div className='flex gap-4 mb-6 justify-center sm:justify-start'>
          <a href='#' className='hover:text-red-600 transition text-xl'>
            <FaFacebookF />
          </a>
          <a href='#' className='hover:text-red-600 transition text-xl'>
            <FaTwitter />
          </a>
          <a href='#' className='hover:text-red-600 transition text-xl'>
            <FaInstagram />
          </a>
          <a href='#' className='hover:text-red-600 transition text-xl'>
            <FaYoutube />
          </a>
        </div>

        {/* COPYRIGHT */}
        <p className='text-gray-500 text-center sm:text-left text-sm'>
          &copy; 2025 LayarTancap, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
