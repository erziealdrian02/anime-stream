'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowBigCard from './ShowBigCard';
import OngoingSkeletonLoader from './loader/OngoingSkeletonLoader';
import { fetchOngoingAnime } from '../lib/api';

function OngoingSection() {
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

  if (loading) {
    return <OngoingSkeletonLoader />;
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
            className="flex overflow-x-scroll space-x-3 w-full pb-5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Apply flex-shrink-0 to prevent cards from shrinking */}
            {shows.map((show) => (
              <div
                key={show.id}
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
                .querySelector('.overflow-x-scroll')
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
                .querySelector('.overflow-x-scroll')
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
