'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { getFeaturedShows } from '../lib/api';
import { fetchOngoingAnime } from '../lib/api';

function Hero() {
  const navigate = useNavigate();
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getAnime = async () => {
      const animeList = await fetchOngoingAnime();
      setOngoingAnime(animeList);
    };

    getAnime();
  }, []);

  useEffect(() => {
    if (ongoingAnime.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ongoingAnime.length);
    }, 5000); // Ganti setiap 5 detik

    return () => clearInterval(interval);
  }, [ongoingAnime]);

  if (ongoingAnime.length === 0) return null;

  const featuredAnime = ongoingAnime[currentIndex];

  return (
    <div className="relative h-[70vh] w-full">
      <img
        src={featuredAnime.poster || '/placeholder.svg?height=800&width=1600'}
        alt={featuredAnime.title}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="container mx-auto">
          <div className="max-w-xl space-y-4">
            <h1 className="text-5xl font-bold">{featuredAnime.title}</h1>
            <div className="text-lg font-semibold text-yellow-400">
              RETURN OF THE MUSIC GOD
            </div>
            <p className="text-gray-300">Bangun dengan kekuatan musik 🎵</p>
            <div className="flex gap-3 mt-4">
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full">
                Tonton Trailer
              </button>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full">
                Tonton Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="relative h-[70vh] w-full">
    //   <img
    //     src={featuredAnime.poster || '/placeholder.svg?height=800&width=1600'}
    //     alt={featuredAnime.title}
    //     className="absolute inset-0 w-full h-full object-cover brightness-75"
    //   />
    //   <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    //   <div className="absolute bottom-0 left-0 p-8 w-full">
    //     <div className="container mx-auto">
    //       <div className="max-w-xl space-y-4">
    //         <h1 className="text-5xl font-bold">{featuredAnime.title}</h1>
    //         <div className="text-lg font-semibold text-yellow-400">
    //           RETURN OF THE MUSIC GOD
    //         </div>
    //         <p className="text-gray-300">Bangun dengan kekuatan musik 🎵</p>
    //         <div className="flex gap-3 mt-4">
    //           <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full">
    //             Tonton Trailer
    //           </button>
    //           <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full">
    //             Tonton Sekarang
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="relative h-[70vh] w-full">
    //   <img
    //     src={featuredAnime.poster}
    //     alt={featuredAnime.title}
    //     className="absolute inset-0 w-full h-full object-cover brightness-50"
    //   />
    //   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    //   <div className="absolute inset-0 flex items-center">
    //     <div className="container mx-auto px-4">
    //       <div className="max-w-2xl space-y-4">
    //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
    //           {featuredAnime.title}
    //         </h1>
    //         <p className="text-lg text-gray-200">
    //           Episode {featuredAnime.episodes} - {featuredAnime.releaseDay}
    //         </p>
    //         <div className="flex flex-wrap gap-3 mt-6">
    //           <Button
    //             onClick={() => navigate(`/watch/${featuredAnime.animeId}`)}
    //             className="bg-primary hover:bg-primary/90"
    //           >
    //             Watch Now
    //           </Button>
    //           <Button
    //             variant="outline"
    //             onClick={() => navigate(`/details/${featuredAnime.animeId}`)}
    //           >
    //             More Info
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Hero;
