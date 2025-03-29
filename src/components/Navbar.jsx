'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-6">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-blue-500"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
                fill="url(#paint0_linear)"
              />
              <path
                d="M25.9667 17.3333L13.9 9.33333V25.3333L25.9667 17.3333Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="18"
                  y1="0"
                  x2="18"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3CCFCF" />
                  <stop offset="1" stopColor="#2772F0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="ml-2 font-bold text-xl text-white">WeNime</span>
          </div>
        </Link>

        {/* Main navigation */}
        <nav className="flex items-center space-x-6 text-sm">
          <Link
            to="/"
            className={`font-medium ${
              location.pathname === '/'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Untukmu
          </Link>
          <Link to="/free" className="text-gray-400 hover:text-white">
            FREE
          </Link>
          <Link
            to="/vote"
            className="text-gray-400 hover:text-white flex items-center"
          >
            <span className="text-red-500 mr-1">❤️</span>CA S2 VOTE
            <span className="text-red-500 ml-1">❤️</span>
          </Link>
          <Link to="/serial" className="text-gray-400 hover:text-white">
            Serial
          </Link>
          <Link to="/variety" className="text-gray-400 hover:text-white">
            Variety Show
          </Link>
          <Link to="/film" className="text-gray-400 hover:text-white">
            Film
          </Link>
          <Link
            to="/anime"
            className={`font-medium ${
              location.pathname.includes('/anime')
                ? 'text-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Anime
          </Link>
          <Link to="/anak" className="text-gray-400 hover:text-white">
            Anak
          </Link>
          <Link to="/semua" className="text-gray-400 hover:text-white">
            Semua
          </Link>
        </nav>

        {/* Right side - search and user */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            {/* <Input
              type="search"
              placeholder="Search..."
              className="w-[240px] bg-gray-800/50 border-gray-700 rounded-full focus-visible:ring-primary"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
            <div className="p-3 overflow-hidden w-[40px] h-[40px] hover:w-[270px] bg-gray-800/50 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
              <div className="flex items-center justify-center fill-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Isolation_Mode"
                  data-name="Isolation Mode"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                </svg>
              </div>
              <input
                type="text"
                className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
              />
            </div>
          </div>

          <button className="text-gray-400 hover:text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="text-gray-400 hover:text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            U
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4">
            <svg
              className="h-4 w-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M19 21V15M16 18H22M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            APP
          </Button>

          <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white rounded-full px-4">
            VIP
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
