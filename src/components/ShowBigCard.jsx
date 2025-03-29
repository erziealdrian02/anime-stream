import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ShowBigCard({ show }) {
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

  const displayedGenres = isMobile ? show.genres.slice(0, 2) : show.genres;
  const remainingGenres =
    isMobile && show.genres.length > 2 ? ` +${show.genres.length - 2}` : '';

  return (
    <div
      // key={show.id}
      // to={`/details/${show.id}`}
      className="group relative block"
      onClick={handleClick}
    >
      <div className="rounded-md overflow-hidden relative h-full">
        <div className="relative aspect-[2/3]">
          {/* Poster Image */}
          <img
            src={show.posterUrl || '/placeholder.svg?height=720&width=1280'}
            alt={show.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Rating in top right with star icon */}
          <div className="absolute top-2 right-2 flex items-center bg-black/70 rounded px-1.5 py-0.5">
            <svg
              className="w-3 h-3 text-yellow-500 mr-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-xs font-bold text-white">
              {show.score !== undefined ? show.score : 'N/A'}
            </span>
          </div>

          {/* Status badge (if completed) */}
          <div className="absolute top-2 left-2">
            {/* Status hanya muncul jika type bukan "Movie" */}
            {show.type !== 'Movie' && (
              <div className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                {show.status}
              </div>
            )}

            {/* Type tetap muncul */}
            <div className="bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 mt-1 rounded">
              {show.type}
            </div>
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
                  // Add your play functionality here
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
                  window.location.href = `/details/${show.id}`;
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
          <div className="flex flex-wrap gap-1">
            {displayedGenres.map((genre, index) => (
              <Link
                key={index}
                to={`/category/${genre.genreId || '#'}`}
                className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full hover:bg-gray-600 transition"
                onClick={(e) => e.stopPropagation()}
              >
                {genre.title}
              </Link>
            )) || <span className="text-xs text-white">N/A</span>}
            {remainingGenres && (
              <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full hover:bg-gray-600 transition">
                {remainingGenres}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBigCard;
