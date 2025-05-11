'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowBigCard from './ShowBigCard';
import OngoingSkeletonLoader from './loader/OngoingSkeletonLoader';
import { fetchOngoingAnime } from '../lib/api';

function OngoingSection() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Mulai fetch data ongoing...');

        const data = await fetchOngoingAnime();
        console.log('Data yang diterima dari API:', data);

        if (!Array.isArray(data)) {
          throw new Error('Data yang diterima bukan array');
        }

        if (data.length === 0) {
          console.warn('Data anime kosong');
        }

        const formattedData = data.map((anime) => ({
          id: anime.animeId || '',
          title: anime.title || 'Untitled',
          posterUrl: anime.poster || '',
          href: anime.href || '',
          score: anime.score || 'N/A',
          status: anime.status || 'Unknown',
          isNew: false,
          isVip: false,
          genres: Array.isArray(anime.genres) ? anime.genres : [],
        }));

        console.log('Data setelah format:', formattedData);
        setShows(formattedData);
      } catch (error) {
        console.error('Error fetching ongoing anime:', error);
        setError(error.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <OngoingSkeletonLoader />;
  }

  if (error) {
    return (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">On Going</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  if (shows.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">On Going</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p>Tidak ada anime ongoing yang tersedia saat ini</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">On Going</h2>
          <Link
            to="/ongoing"
            data-testid="see-all-ongoing"
            className="text-sm text-gray-400 hover:text-white"
          >
            Lihat Semua &gt;
          </Link>
        </div>

        <div className="relative w-full">
          {/* Main container with horizontal scroll */}
          <div
            className="flex overflow-x-scroll space-x-3 w-full pb-5 scroll-container"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Apply flex-shrink-0 to prevent cards from shrinking */}
            {shows.map((show) => (
              <div
                key={show.id || `anime-${Math.random()}`}
                className="flex-shrink-0 w-[190px] md:w-[250px]"
              >
                <ShowBigCard show={show} />
              </div>
            ))}
          </div>

          {/* Optional scroll buttons for better UX */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full z-10 hidden md:block"
            onClick={() =>
              document
                .querySelector('.scroll-container')
                .scrollBy({ left: -300, behavior: 'smooth' })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full z-10 hidden md:block"
            onClick={() =>
              document
                .querySelector('.scroll-container')
                .scrollBy({ left: 300, behavior: 'smooth' })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default OngoingSection;
