'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingShows } from '../lib/api';

function TrendingSection() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingShows();
        setShows(data);
      } catch (error) {
        console.error('Error fetching trending shows:', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Trending Now</h2>
        <Link
          to="/category/trending"
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
        {shows.map((show, index) => (
          <Link key={show.id} to={`/details/${show.id}`} className="group">
            <div className="relative aspect-[2/3] overflow-hidden rounded-md">
              <img
                src={show.posterUrl || '/placeholder.svg?height=450&width=300'}
                alt={show.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-0 left-0 w-8 h-8 bg-primary flex items-center justify-center font-bold rounded-br-md">
                {index + 1}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="font-semibold line-clamp-2">{show.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;
