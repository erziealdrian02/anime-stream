'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { fetchOngoingAnime } from '../lib/api';

function Hero() {
  const navigate = useNavigate();
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  useEffect(() => {
    const getAnime = async () => {
      const animeList = await fetchOngoingAnime();
      setOngoingAnime(animeList);
    };

    getAnime();
  }, []);

  useEffect(() => {
    // Auto-rotate featured shows every 8 seconds
    const interval = setInterval(() => {
      if (ongoingAnime.length > 1) {
        nextShow();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [ongoingAnime, currentIndex]);

  const nextShow = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ongoingAnime.length);
      setIsTransitioning(false);
      setShowFullSynopsis(false); // Reset synopsis view when changing shows
    }, 500);
  };

  const prevShow = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? ongoingAnime.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
      setShowFullSynopsis(false); // Reset synopsis view when changing shows
    }, 500);
  };

  if (ongoingAnime.length === 0) return null;

  const featuredAnime = ongoingAnime[currentIndex];
  // console.log(featuredAnime);

  // Render synopsis based on whether it's an array or a single string
  const renderSynopsis = () => {
    if (!featuredAnime.synopsis) return null;

    if (Array.isArray(featuredAnime.synopsis)) {
      // If it's an array, show first paragraph or all paragraphs based on state
      const synopsisToShow = showFullSynopsis
        ? featuredAnime.synopsis
        : [featuredAnime.synopsis[0]];

      return (
        <div className="text-gray-300 max-w-2xl mb-6">
          {synopsisToShow.map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    } else {
      // If it's a string, just show it normally
      return (
        <p className="text-gray-300 max-w-2xl mb-6">{featuredAnime.synopsis}</p>
      );
    }
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div className="block md:hidden">
        <img
          src={featuredAnime.poster || '/placeholder.svg?height=800&width=1600'}
          alt={featuredAnime.title}
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="container mx-auto">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold">{featuredAnime.title}</h1>
              <div className="text-lg font-semibold text-blue-400">
                {featuredAnime.japanese}
              </div>
              <p className="text-gray-300 line-clamp-5">
                {featuredAnime.synopsis}
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => navigate(`/details/${featuredAnime.animeId}`)}
                  className="bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                  </svg>
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blurred landscape background */}
      <div className="hidden md:block">
        <img
          src={featuredAnime.poster || '/placeholder.svg?height=800&width=1600'}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm brightness-50 transition-opacity duration-500 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />

        <div
          className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="container mx-auto px-4 flex">
            {/* Grid of portrait images */}
            <div className="hidden md:block w-1/3 pr-8">
              <div className="flex justify-center">
                <div className="bg-blue-700 rounded-md overflow-hidden">
                  <img
                    src={
                      featuredAnime.poster ||
                      '/placeholder.svg?height=300&width=200'
                    }
                    alt=""
                    className="w-[300px] h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/3">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    {featuredAnime.status}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                    {featuredAnime.title}
                  </h1>
                  <p className="text-gray-400 text-lg mb-4">
                    {featuredAnime.japanese}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300 mb-6">
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1 text-blue-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Airs on {featuredAnime.aired || 'TBA'}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1 text-blue-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Score: {featuredAnime.score}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1 text-blue-400"
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
                          d="M12 6V12L16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Duration: {featuredAnime.duration}
                    </div>
                  </div>
                  <div className="w-full mb-3">
                    <div className="flex items-center">
                      {featuredAnime.genres.map((genre, index) => (
                        <Link
                          key={index}
                          to={`/category/${genre.genreId || '#'}`}
                          className="bg-gray-700 mr-3 text-white text-xs px-2 py-0.5 rounded-full hover:bg-gray-600 transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {genre.title}
                        </Link>
                      )) || <span className="text-xs text-white">N/A</span>}
                      {/* {featuredAnime.genres
                      ? featuredAnime.genres
                          .map((genre) => genre.title)
                          .join(', ')
                      : 'Unknown'} */}
                    </div>
                  </div>

                  {/* Synopsis section with conditional rendering */}
                  {renderSynopsis()}
                </div>

                <div className="flex gap-4 mt-auto">
                  <Button
                    onClick={() =>
                      navigate(`/details/${featuredAnime.animeId}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                    </svg>
                    Watch Now
                  </Button>
                  {/* <Button
                  variant="outline"
                  onClick={() => navigate(`/details/${featuredAnime.animeId}`)}
                  className="border-gray-600 text-white hover:bg-gray-800 rounded-md"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  More Info
                </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
          onClick={prevShow}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
          onClick={nextShow}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="container mx-auto">
            <div className="flex justify-center space-x-2">
              {ongoingAnime.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
