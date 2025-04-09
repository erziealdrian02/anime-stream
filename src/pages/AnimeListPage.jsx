'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnimeList } from '../lib/api';

function AnimeListPage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState('All');

  const alphabet = [
    'All',
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
      try {
        const data = await getAnimeList();
        setAnimeList(data);
      } catch (error) {
        console.error('Error fetching anime list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  // Group anime by first letter
  const groupedAnime = animeList.reduce((acc, anime) => {
    const firstLetter = anime.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(anime);
    return acc;
  }, {});

  // Filter anime based on selected letter
  const filteredAnime =
    activeIndex === 'All'
      ? animeList
      : animeList.filter(
          (anime) => anime.title.charAt(0).toUpperCase() === activeIndex
        );

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Anime List</h1>
        {/* Alphabet Index */}
        <div className="flex flex-wrap gap-2 mb-8">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium 
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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {activeIndex === 'All' ? (
              // Display all anime grouped by letter
              Object.keys(groupedAnime)
                .sort()
                .map((letter) => (
                  <div key={letter} id={letter} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
                      {letter}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {groupedAnime[letter].map((anime) => (
                        <Link
                          key={anime.id}
                          to={`/details/${anime.id}`}
                          className="group"
                        >
                          <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                            <img
                              src={
                                anime.posterUrl ||
                                '/placeholder.svg?height=450&width=300'
                              }
                              alt={anime.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            {anime.isVip && (
                              <div className="absolute top-1 right-1 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded">
                                VIP
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                              <div className="text-xs font-medium line-clamp-2">
                                {anime.title}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
            ) : (
              // Display filtered anime for selected letter
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
                  {activeIndex}
                </h2>
                {filteredAnime.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredAnime.map((anime) => (
                      <Link
                        key={anime.id}
                        to={`/details/${anime.id}`}
                        className="group"
                      >
                        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                          <img
                            src={
                              anime.posterUrl ||
                              '/placeholder.svg?height=450&width=300'
                            }
                            alt={anime.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {anime.isVip && (
                            <div className="absolute top-1 right-1 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded">
                              VIP
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                            <div className="text-xs font-medium line-clamp-2">
                              {anime.title}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    No anime titles found starting with '{activeIndex}'
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AnimeListPage;
