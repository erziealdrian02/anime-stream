'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [text, setText] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchAnime = async (query) => {
    if (!query.trim()) return setAnimes([]);

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/samehadaku/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const rawData = await response.json();
      console.log('API Response:', rawData);

      // Extract the data array from the response structure
      let resultsArray = [];

      // Check for the specific structure from your API response
      if (
        rawData &&
        rawData.data &&
        rawData.data.animeList &&
        Array.isArray(rawData.data.animeList)
      ) {
        resultsArray = rawData.data.animeList;
      } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
        resultsArray = rawData.data;
      } else if (
        rawData &&
        rawData.data &&
        typeof rawData.data === 'object' &&
        rawData.data.results
      ) {
        resultsArray = rawData.data.results;
      } else if (Array.isArray(rawData)) {
        resultsArray = rawData;
      } else if (rawData && typeof rawData === 'object') {
        // Try to find an array property in the response
        const possibleArrayProps = [
          'results',
          'data',
          'items',
          'animes',
          'content',
          'animeList',
        ];

        for (const prop of possibleArrayProps) {
          if (Array.isArray(rawData[prop])) {
            resultsArray = rawData[prop];
            break;
          }

          // Check one level deeper
          if (rawData.data && Array.isArray(rawData.data[prop])) {
            resultsArray = rawData.data[prop];
            break;
          }
        }
      }

      console.log('Processed array:', resultsArray);

      if (!Array.isArray(resultsArray)) {
        console.error('Could not find array in response');
        resultsArray = [];
      }

      const results = resultsArray.map((anime) => ({
        animeId: anime.animeId || anime._animeId || anime.slug || '',
        title: anime.title || anime.name || 'Unknown Title',
        poster:
          anime.poster ||
          anime.image ||
          anime.thumbnail ||
          '/placeholder.svg?height=100&width=70',
      }));

      setAnimes(results);
    } catch (error) {
      console.error('Error searching:', error);
      setAnimes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (value.length > 2) {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => searchAnime(value), 500);
    } else {
      setAnimes([]);
    }
  };

  // Handle search focus
  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  // Add this effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search expands
  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

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
            <span className="ml-2 font-bold text-xl text-white">WeTV</span>
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
                ? 'text-orange-500'
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
          <div className="relative search-container" ref={searchContainerRef}>
            <div
              className={`p-3 overflow-hidden ${
                isSearchExpanded ? 'w-[270px]' : 'w-[40px]'
              } h-[40px] bg-gray-800/50 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center transition-all duration-300`}
            >
              <div
                className="flex items-center justify-center fill-white"
                onClick={handleSearchFocus}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="outline-none text-[16px] bg-transparent w-full text-white font-normal px-4"
                value={text}
                onChange={handleChange}
                onFocus={handleSearchFocus}
                placeholder="Search anime..."
              />
            </div>

            {/* Search Results Dropdown */}
            {isSearchExpanded && (
              <div className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto bg-gray-900 rounded-md shadow-lg z-50">
                {loading ? (
                  // Skeleton Loader
                  <div className="p-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 animate-pulse"
                      >
                        <div className="w-8 h-10 bg-gray-700 rounded"></div>
                        <div className="flex-1 h-4 bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : animes.length > 0 ? (
                  animes.map((anime, index) => (
                    <Link
                      key={index}
                      to={`/details/${anime.animeId}`}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-800 border-b border-gray-800 last:border-b-0"
                      onClick={() => {
                        setAnimes([]);
                        setIsSearchExpanded(false);
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={anime.poster}
                          alt={anime.title}
                          className="w-8 h-10 object-cover mr-2 rounded"
                          onError={(e) => {
                            e.target.src =
                              '/placeholder.svg?height=100&width=70';
                          }}
                        />
                        <span className="line-clamp-1">{anime.title}</span>
                      </div>
                    </Link>
                  ))
                ) : text.length > 2 ? (
                  <div className="p-4 text-sm text-gray-400 text-center">
                    No results found
                  </div>
                ) : null}
              </div>
            )}
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

          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            U
          </div>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4">
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

          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-4">
            VIP
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
