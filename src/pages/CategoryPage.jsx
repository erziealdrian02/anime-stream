'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOngoingAnime } from '../lib/api';

function CategoryPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const data = await fetchOngoingAnime();

        if (!Array.isArray(data)) {
          console.error('Data animeList tidak valid:', data);
          return;
        }

        const formattedData = data.map((anime) => ({
          id: anime.animeId,
          title: anime.title,
          posterUrl: anime.poster,
          href: anime.href,
          score: anime.score, // Sekarang pasti ada
          status: anime.status, // Sekarang pasti ada
          isNew: false,
          isVip: false,
          genres: anime.genres, // Sekarang pasti ada
        }));

        setShows(formattedData);
      } catch (error) {
        console.error('Error fetching ongoing anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // if (loading) {
  //   return <OngoingSkeletonLoader />;
  // }

  // const filteredShows =
  //   activeFilter === 'all'
  //     ? shows
  //     : shows.filter((show) => {
  //         if (activeFilter === 'newest') return show.releaseYear >= 2023;
  //         if (activeFilter === 'popular') return show.popularity > 8;
  //         return true;
  //       });

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Secondary Navigation */}
      <div className="bg-black/90 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 text-sm overflow-x-auto py-3">
            <Link to="/" className="text-white whitespace-nowrap">
              Untukmu
            </Link>
            <Link
              to="/semua-konten"
              className="text-gray-400 hover:text-white whitespace-nowrap"
            >
              Semua konten
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {shows.map((show, index) => (
            <div key={show.id} className="flex-shrink-0 w-full snap-center">
              <div className="relative h-[50vh]">
                <img
                  src={
                    show.backdropUrl || '/placeholder.svg?height=600&width=1200'
                  }
                  alt={show.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="container mx-auto">
                    <div className="max-w-lg">
                      <h1 className="text-3xl font-bold">{show.title}</h1>
                      <p className="text-gray-300 mt-2 line-clamp-2">
                        {show.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {shows.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full ${
                index === 0 ? 'w-6 bg-white' : 'w-1.5 bg-gray-500'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Top Trending */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top Trending</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {/* {filteredShows.slice(0, 10).map((show, index) => (
              <Link key={show.id} to={`/details/${show.id}`} className="group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                  <img
                    src={
                      show.posterUrl || '/placeholder.svg?height=450&width=300'
                    }
                    alt={show.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {index < 3 && (
                    <div className="absolute top-0 left-0 w-6 h-6 bg-primary flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                  )}
                  {show.isVip && (
                    <div className="absolute top-1 right-1 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded">
                      VIP
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <div className="text-xs font-medium line-clamp-2">
                      {show.title}
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-xs text-gray-400">
                    {show.type === 'drama'
                      ? 'Fantasy Melodrama'
                      : 'Variety Show'}
                  </p>
                </div>
              </Link>
            ))} */}
          </div>
        </div>

        {/* Terbaru */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Terbaru</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {/* {filteredShows.slice(5, 15).map((show) => (
              <Link key={show.id} to={`/details/${show.id}`} className="group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                  <img
                    src={
                      show.posterUrl || '/placeholder.svg?height=450&width=300'
                    }
                    alt={show.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {show.isNew && (
                    <div className="absolute top-1 right-1 bg-red-500 text-xs font-bold px-1 py-0.5 rounded">
                      NEW
                    </div>
                  )}
                  {show.isVip && (
                    <div className="absolute top-1 left-1 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded">
                      VIP
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <div className="text-xs font-medium line-clamp-2">
                      {show.title}
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-xs text-gray-400">
                    {show.type === 'drama'
                      ? 'Fantasy Melodrama'
                      : 'Variety Show'}
                  </p>
                </div>
              </Link>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
