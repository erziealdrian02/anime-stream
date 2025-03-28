'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { getFeaturedShow } from '../lib/api';

function Hero() {
  const navigate = useNavigate();
  const [featuredShow, setFeaturedShow] = useState(null);

  useEffect(() => {
    const fetchFeaturedShow = async () => {
      try {
        // In a real app, this would be an actual API call
        const show = await getFeaturedShow();
        setFeaturedShow(show);
      } catch (error) {
        console.error('Error fetching featured show:', error);
      }
    };

    fetchFeaturedShow();
  }, []);

  if (!featuredShow) return null;

  return (
    <div className="relative h-[70vh] w-full">
      <img
        src={
          featuredShow.backdropUrl || '/placeholder.svg?height=800&width=1600'
        }
        alt={featuredShow.title}
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {featuredShow.title}
            </h1>
            <p className="text-lg text-gray-200 line-clamp-3">
              {featuredShow.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={() => navigate(`/watch/${featuredShow.id}`)}
                className="bg-primary hover:bg-primary/90"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                </svg>
                Watch Now
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/details/${featuredShow.id}`)}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
