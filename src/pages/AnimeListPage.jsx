'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimeListSkeleton from '../components/loader/AnimeListSkeleton';

function AnimeListPage() {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState('All');
  const [error, setError] = useState(null);

  // Create alphabet index including special characters
  const alphabet = [
    'All',
    '#',
    '0-9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'http://wenime-api.vercel.app/samehadaku/anime'
        );
        const result = await response.json();

        if (
          !response.ok ||
          !result?.data?.list ||
          !Array.isArray(result.data.list)
        ) {
          throw new Error('Failed to fetch anime list or invalid data format');
        }

        setAnimeData(result.data.list);
      } catch (error) {
        console.error('Error fetching anime list:', error);
        setError('Failed to load anime list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  // Get filtered anime based on selected letter
  const getFilteredAnime = () => {
    if (activeIndex === 'All') {
      return animeData;
    } else if (activeIndex === '0-9') {
      return animeData.filter(
        (group) => group.startWith && /^[0-9]/.test(group.startWith)
      );
    } else {
      return animeData.filter(
        (group) =>
          group.startWith && group.startWith.toUpperCase() === activeIndex
      );
    }
  };

  const filteredAnime = getFilteredAnime();

  return (
    <div className="min-h-screen bg-black pt-16">
      {loading ? (
        <AnimeListSkeleton />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">Anime List</h1>

          {/* Alphabet Index */}
          <div className="flex flex-wrap gap-2 mb-8">
            {alphabet.map((letter) => (
              <button
                key={letter}
                className={`px-3 py-1.5 rounded text-sm font-medium 
                  ${
                    activeIndex === letter
                      ? 'bg-primary text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                onClick={() => setActiveIndex(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          {error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <>
              {activeIndex === 'All' ? (
                // Display all anime grouped as returned from API
                animeData.map((group) => (
                  <div
                    key={group.startWith}
                    id={group.startWith}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2 text-white">
                      {group.startWith}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {group.animeList.map((anime) => (
                        <Link
                          key={anime.animeId}
                          to={`/details/${anime.animeId}`}
                          className="group bg-gray-900 rounded-md overflow-hidden hover:bg-gray-800 transition-colors"
                        >
                          <div className="p-3 border-l-4 border-primary">
                            <div className="text-sm font-medium text-white line-clamp-2">
                              {anime.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : // Display filtered anime for selected letter
              filteredAnime.length > 0 ? (
                filteredAnime.map((group) => (
                  <div
                    key={group.startWith}
                    id={group.startWith}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2 text-white">
                      {group.startWith}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {group.animeList.map((anime) => (
                        <Link
                          key={anime.animeId}
                          to={`/details/${anime.animeId}`}
                          className="group bg-gray-900 rounded-md overflow-hidden hover:bg-gray-800 transition-colors"
                        >
                          <div className="p-3 border-l-4 border-primary">
                            <div className="text-sm font-medium text-white line-clamp-2">
                              {anime.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No anime titles found starting with '{activeIndex}'
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AnimeListPage;
