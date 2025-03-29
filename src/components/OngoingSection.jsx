'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowCard from './ShowCard';
import { fetchOngoingAnime } from '../lib/api';

function OngoingSection() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await fetchOngoingAnime();
        const formattedData = data.map((anime) => ({
          id: anime.animeId, // Gunakan animeId sebagai id
          title: anime.title,
          posterUrl: anime.poster, // Sesuaikan dengan API
          href: anime.href, // Bisa dipakai untuk navigasi nanti
          isNew: false, // Bisa tambahkan logic jika ada indikator baru
          isVip: false, // Bisa tambahkan logic jika ada indikator VIP
        }));

        setShows(formattedData);
      } catch (error) {
        console.error('Error fetching ongoing anime:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">On Going</h2>
        <Link
          to="/category/ongoing"
          className="text-sm text-gray-400 flex items-center hover:text-white"
        >
          View All
          <svg
            className="h-4 w-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
}

export default OngoingSection;
