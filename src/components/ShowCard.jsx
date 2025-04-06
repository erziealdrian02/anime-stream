import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ShowCard({ show }) {
  const [isMobileHover, setIsMobileHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset hover state when clicking outside the card
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileHover) {
        setIsMobileHover(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileHover]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileHover) {
        setIsMobileHover(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileHover]);

  const handleClick = (e) => {
    // If on mobile and not in hover state, show hover state instead of navigating
    if (isMobile && !isMobileHover) {
      e.preventDefault();
      e.stopPropagation();
      setIsMobileHover(true);
    }
  };

  return (
    <div
      key={show.animeId}
      to={`/details/${show.animeId}`}
      className="group relative block"
      onClick={handleClick}
    >
      <div className="rounded-md overflow-hidden relative h-full">
        <div className="relative aspect-[2/3]">
          {/* Poster Image */}
          <img
            src={show.poster || '/placeholder.svg?height=720&width=1280'}
            alt={show.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Status badge (if completed) */}
          <div className="absolute top-2 left-2">
            {/* Status hanya muncul jika type bukan "Movie" */}
            {show.type !== 'Movie' && (
              <div
                className={`${
                  show.status === 'Ongoing' ? 'bg-yellow-600' : 'bg-green-600'
                } text-white text-xs font-bold px-2 py-0.5 rounded`}
              >
                {show.status}
              </div>
            )}
          </div>

          {/* Hover overlay - show conditionally based on hover state or isMobileHover */}
          <div
            className={`absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity duration-300 ${
              isMobileHover
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <div className="flex space-x-3">
              {/* Play button */}
              <button
                className="w-10 h-10 bg-white/20 hover:bg-blue-400/55 rounded-full flex items-center justify-center transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/details/${show.animeId}`;
                }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {/* Info button */}
              <button
                className="w-10 h-10 bg-white/20 hover:bg-blue-400/55 rounded-full flex items-center justify-center transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/details/${show.animeId}`;
                }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 000-2H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Title and metadata at bottom */}
        <div className="p-2">
          <h3 className="text-lg font-bold group-hover:text-blue-400 truncate mb-2">
            {show.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
