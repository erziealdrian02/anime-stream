'use client';

import Hero from '../components/Hero';
import OngoingSection from '../components/OngoingSection';
import CategorySection from '../components/CategorySection';
import CompleteSection from '../components/CompleteSection';
import PopularSection from '../components/PopularSection';
import MovieSection from '../components/MovieSection';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getFeaturedShow,
  getFeaturedShows,
  getTrendingShows,
  getRecommendedShows,
  getNewReleases,
} from '../lib/api';

function HomePage() {
  const [featuredShow, setFeaturedShow] = useState(null);
  const [featuredShows, setFeaturedShows] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await getFeaturedShow();
        const featuredList = await getFeaturedShows();
        const trending = await getTrendingShows();
        const recommended = await getRecommendedShows();
        const newReleasesList = await getNewReleases();

        setFeaturedShow(featured);
        setFeaturedShows(featuredList);
        setTrendingShows(trending);
        setRecommendedShows(recommended);
        setNewReleases(newReleasesList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Banner */}
      <Hero />

      <div className="container mx-auto px-4 py-8">
        {/* Ongoing Section */}
        <OngoingSection />

        {/* Complete Section */}
        <CompleteSection />

        {/* Category Section */}
        <CategorySection />

        {/* Top Trending */}
        {/* <PopularSection /> */}

        {/* Movie Section */}
        <MovieSection />
      </div>
    </div>
  );
}

export default HomePage;
