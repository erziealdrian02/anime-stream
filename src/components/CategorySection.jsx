'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenresWithPosters } from '../lib/api';

function CategorySection() {
  const [genres, setGenres] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenresWithPosters();
      setGenres(data);
    };

    loadGenres();
  }, []);

  // Menampilkan hanya 6 genre jika showAll = false
  const visibleGenres = showAll ? genres : genres.slice(0, 6);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <h3 className="text-xl font-bold text-white">{genre.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Tombol "Show All Categories" */}
      {!showAll && genres.length > 6 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 block w-full bg-primary text-white py-2 rounded-md text-center hover:bg-primary/80 transition"
        >
          Show All Categories
        </button>
      )}
    </section>
  );
}

export default CategorySection;
