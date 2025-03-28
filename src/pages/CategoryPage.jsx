'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import ShowCard from '../components/ShowCard';
import { getCategoryShows } from '../lib/api';

function CategoryPage() {
  const { slug } = useParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Convert slug to readable name
  const categoryName = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an actual API call
        const showsData = await getCategoryShows(slug);
        setShows(showsData);
      } catch (error) {
        console.error('Error fetching category shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const filteredShows =
    activeFilter === 'all'
      ? shows
      : shows.filter((show) => {
          if (activeFilter === 'newest') return show.releaseYear >= 2023;
          if (activeFilter === 'popular') return show.popularity > 8;
          return true;
        });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredShows.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No shows found in this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CategoryPage;
