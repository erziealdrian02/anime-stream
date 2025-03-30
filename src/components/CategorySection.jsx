'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenresWithPosters } from '../lib/api';
import CategorySkeletonLoader from './loader/CategorySkeletonLoader';

function CategorySection() {
  const [genres, setGenres] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true);
        const data = await fetchGenresWithPosters();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  if (loading) {
    return <CategorySkeletonLoader />;
  }

  // Slice the genres array based on showAll state
  const visibleGenres = showAll ? genres : genres.slice(0, 8);

  return (
    <section>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Browse by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleGenres.map((genre) => (
            <Link
              key={genre.id}
              to={`/category/${genre.id}`}
              className="group relative overflow-hidden rounded-md aspect-video"
            >
              <img
                src={genre.image}
                alt={genre.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-bold group-hover:text-blue-300/55 transition text-white">
                  {genre.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Tombol Toggle Show More / Show Less */}
        {genres.length > 8 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-4 block w-full bg-primary text-white py-2 rounded-md text-center hover:bg-primary/80 transition"
          >
            {showAll ? 'Show Less' : 'Show All Categories'}
          </button>
        )}
      </div>
    </section>
  );
}

export default CategorySection;
