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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const mobileMenuRef = useRef(null);

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
        `http://wenime-api.vercel.app/samehadaku/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const rawData = await response.json();

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

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains('mobile-menu-toggle')
      ) {
        setMobileMenuOpen(false);
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

  // Navigation links data
  const navLinks = [
    { path: '/', label: 'Beranda', highlight: location.pathname === '/' },
    {
      path: '/anime-list',
      label: 'Semua Anime List',
      highlight: location.pathname === '/anime-list',
    },
    {
      path: '/schedule',
      label: 'Jadwal Anime',
      highlight: location.pathname === '/schedule',
    },
    // {
    //   path: '/news',
    //   label: 'Berita Anime',
    //   highlight: location.pathname === '/news',
    //   icon: '❤️',
    // },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-6 z-20">
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

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden flex items-center justify-center text-white mobile-menu-toggle z-20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
          )}
        </button>

        {/* Main navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`font-medium transition-colors duration-200 ${
                link.highlight
                  ? link.orangeHighlight
                    ? 'text-orange-500'
                    : 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.icon && (
                <span className="text-red-500 mr-1">{link.icon}</span>
              )}
              {link.label}
              {link.icon && (
                <span className="text-red-500 ml-1">{link.icon}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile navigation overlay */}
        <div
          ref={mobileMenuRef}
          className={`fixed inset-0 bg-black/95 z-10 md:hidden transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 pb-20 px-6 h-full overflow-y-auto">
            {/* Mobile search */}
            <div className="mt-6">
              <div className="relative w-full">
                <div className="p-3 w-full bg-gray-800/70 rounded-full flex items-center">
                  <div className="flex items-center justify-center fill-white">
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
                    type="text"
                    className="outline-none text-[16px] bg-transparent w-full text-white font-normal px-4"
                    value={text}
                    onChange={handleChange}
                    placeholder="Search anime..."
                  />
                </div>

                {/* Mobile search results */}
                {text.length > 2 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm rounded-md shadow-lg z-50 border border-gray-800 max-h-[60vh] overflow-hidden">
                    <div className="sticky top-0 bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                      <span className="text-sm font-medium text-white">
                        Search Results{' '}
                        {animes.length > 0 && `(${animes.length})`}
                      </span>
                      {loading && (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span className="text-xs text-gray-400">
                            Searching...
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="overflow-y-auto max-h-[50vh]">
                      {loading ? (
                        // Skeleton Loader
                        <div className="p-2">
                          {[...Array(4)].map((_, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 p-3 animate-pulse"
                            >
                              <div className="w-12 h-16 bg-gray-700 rounded"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : animes.length > 0 ? (
                        animes.map((anime, index) => (
                          <Link
                            key={index}
                            to={`/details/${anime.animeId}`}
                            className="block p-3 text-sm text-white hover:bg-gray-800/70 border-b border-gray-800/50 last:border-b-0 transition-colors duration-150"
                            onClick={() => {
                              setAnimes([]);
                              setMobileMenuOpen(false);
                            }}
                          >
                            <div className="flex gap-3">
                              <img
                                src={anime.poster || '/placeholder.svg'}
                                alt={anime.title}
                                className="w-12 h-16 object-cover rounded shadow-md flex-shrink-0"
                                onError={(e) => {
                                  e.target.src =
                                    '/placeholder.svg?height=100&width=70';
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white line-clamp-1">
                                  {anime.title}
                                </h4>
                                <div className="mt-1 flex items-center text-xs text-gray-400">
                                  <span className="flex items-center">
                                    <svg
                                      className="w-3 h-3 text-yellow-400 mr-1"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    {anime.rating || '8.7'}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span>{anime.type || 'TV'}</span>
                                  <span className="mx-2">•</span>
                                  <span>{anime.episodes || '12'} eps</span>
                                </div>
                                <div className="mt-1">
                                  <span className="inline-block px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                    {anime.status || 'Ongoing'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-8 text-sm text-gray-400 text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-600 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <p>No results found for "{text}"</p>
                          <p className="text-xs mt-1">
                            Try different keywords or check spelling
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile navigation menu */}
            <nav className="flex flex-col space-y-4 mt-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium py-2 border-b border-gray-800 ${
                    link.highlight
                      ? link.orangeHighlight
                        ? 'text-orange-500'
                        : 'text-white'
                      : 'text-gray-300'
                  }`}
                >
                  {link.icon && (
                    <span className="text-red-500 mr-1">{link.icon}</span>
                  )}
                  {link.label}
                  {link.icon && (
                    <span className="text-red-500 ml-1">{link.icon}</span>
                  )}
                </Link>
              ))}
            </nav>
            {/* Mobile action buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2">
                <svg
                  className="h-4 w-4 mr-2"
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
            </div>
          </div>
        </div>

        {/* Right side actions - Desktop */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {/* Desktop Search */}
          <div className="relative search-container" ref={searchContainerRef}>
            <div
              className={`p-3 overflow-hidden ${
                isSearchExpanded ? 'w-[270px]' : 'w-[40px]'
              } h-[40px] bg-gray-800/50 shadow-lg rounded-full flex items-center transition-all duration-300`}
            >
              <div
                className="flex items-center justify-center fill-white cursor-pointer"
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

            {/* Enhanced Search Results Dropdown */}
            {isSearchExpanded && (
              <div className="absolute top-full right-0 mt-2 w-80 max-h-[80vh] overflow-hidden bg-gray-900/95 backdrop-blur-sm rounded-md shadow-lg z-50 border border-gray-800">
                {/* Search Header */}
                <div className="sticky top-0 bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                  <span className="text-sm font-medium text-white">
                    Search Results {animes.length > 0 && `(${animes.length})`}
                  </span>
                  {loading && (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-xs text-gray-400">
                        Searching...
                      </span>
                    </div>
                  )}
                </div>

                {/* Results Container with Custom Scrollbar */}
                <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
                  {loading ? (
                    // Skeleton Loader
                    <div className="p-2">
                      {[...Array(8)].map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 animate-pulse"
                        >
                          <div className="w-12 h-16 bg-gray-700 rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : animes.length > 0 ? (
                    animes.map((anime, index) => (
                      <Link
                        key={index}
                        to={`/details/${anime.animeId}`}
                        className="block p-3 text-sm text-white hover:bg-gray-800/70 border-b border-gray-800/50 last:border-b-0 transition-colors duration-150"
                        onClick={() => {
                          setAnimes([]);
                          setIsSearchExpanded(false);
                        }}
                      >
                        <div className="flex gap-3">
                          <img
                            src={anime.poster || '/placeholder.svg'}
                            alt={anime.title}
                            className="w-12 h-16 object-cover rounded shadow-md flex-shrink-0"
                            onError={(e) => {
                              e.target.src =
                                '/placeholder.svg?height=100&width=70';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white line-clamp-1">
                              {anime.title}
                            </h4>
                            <div className="mt-1 flex items-center text-xs text-gray-400">
                              <span className="flex items-center">
                                <svg
                                  className="w-3 h-3 text-yellow-400 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                {anime.rating || '8.7'}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{anime.type || 'TV'}</span>
                              <span className="mx-2">•</span>
                              <span>{anime.episodes || '12'} eps</span>
                            </div>
                            <div className="mt-1">
                              <span className="inline-block px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                {anime.status || 'Ongoing'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : text.length > 2 ? (
                    <div className="p-8 text-sm text-gray-400 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-600 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <p>No results found for "{text}"</p>
                      <p className="text-xs mt-1">
                        Try different keywords or check spelling
                      </p>
                    </div>
                  ) : (
                    <div className="p-8 text-sm text-gray-400 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-600 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <p>Type at least 3 characters to search</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="text-gray-400 hover:text-white transition-colors duration-200">
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
          {/* <button className="text-gray-400 hover:text-white transition-colors duration-200">
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
          </button> */}

          {/* APP button */}
          {/* <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 hidden sm:flex items-center transition-colors duration-200">
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
          </Button> */}
        </div>

        {/* Small screen actions (visible on medium screens but not on mobile) */}
        <div className="md:hidden sm:flex items-center gap-3 ml-auto">
          <div className="relative search-container">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 bg-gray-800/50 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="white"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gradient border bottom effect */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
    </header>
  );
}

export default Navbar;
