'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAnimebyCategory, fetchMoreAnimebyCategory } from '../lib/api';
import ShowBigCard from '../components/ShowBigCard';
import CategoryPageSkeletonLoader from '../components/loader/CategoryPageSkeletonLoader';

// Moved to a separate file or could be kept here
export async function fetchGenres() {
  try {
    // Ambil anime dari genre awal (action) untuk sampling genre
    const { animeList } = await fetchAnimebyCategory(genreId, 1);

    // Extract all unique genres
    const genresMap = new Map();

    animeList.forEach((anime) => {
      if (Array.isArray(anime.genres)) {
        anime.genres.forEach((genre) => {
          if (!genresMap.has(genre.genreId) && genre.genreId) {
            genresMap.set(genre.genreId, {
              genreId: genre.genreId,
              title: genre.title,
              poster: anime.poster, // Use the first anime with this genre as the poster
              animeCount: 1,
            });
          } else if (genre.genreId) {
            // Increment count for existing genres
            const existingGenre = genresMap.get(genre.genreId);
            existingGenre.animeCount += 1;
          }
        });
      }
    });

    // Convert map to array and sort by anime count
    return Array.from(genresMap.values()).sort(
      (a, b) => b.animeCount - a.animeCount
    );
  } catch (error) {
    console.error('Error fetching genres with posters:', error);
    return [];
  }
}

function CategoryPage() {
  const { genreId } = useParams();
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [hasMore, setHasMore] = useState(true);

  // Format anime data helper function
  const formatAnimeData = (anime) => ({
    id: anime.animeId,
    title: anime.title,
    posterUrl: anime.poster,
    backdropUrl: anime.poster, // Using poster as backdrop since we don't have a specific backdrop
    href: anime.href,
    episodes: anime.episodes,
    releaseDay: anime.releaseDay,
    latestReleaseDate: anime.latestReleaseDate,
    score: anime.score || 'N/A',
    status: anime.status || 'Ongoing',
    description: Array.isArray(anime.synopsis)
      ? anime.synopsis.join(' ')
      : typeof anime.synopsis === 'string'
      ? anime.synopsis
      : typeof anime.synopsis === 'object' && anime.synopsis?.paragraphs
      ? anime.synopsis.paragraphs.join(' ')
      : 'No description available',
    releaseYear: anime.aired ? parseInt(anime.aired.split(' ')[2]) : 2025,
    popularity: parseFloat(anime.score) || 0,
    type: 'anime',
    genres: anime.genres || [],
    isNew:
      anime.latestReleaseDate &&
      new Date(anime.latestReleaseDate) >=
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 hari terakhir
    isVip: Math.random() > 0.8, // Random VIP tags for demo
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setShows([]); // Clear previous shows when filter changes

        // Fetch both anime and genres simultaneously
        const [animeData, genresData] = await Promise.all([
          fetchAnimebyCategory(genreId, 3), // Only load first 3 pages initially
          fetchGenres(),
        ]);

        if (!animeData || !Array.isArray(animeData.animeList)) {
          console.error('Data animeList tidak valid:', animeData);
          setLoading(false);
          return;
        }

        const formattedData = animeData.animeList.map(formatAnimeData);

        // Sort initial data here
        const sortedInitialData = sortAnimeData(formattedData);

        setShows(sortedInitialData);
        setGenres(genresData);

        // Set pagination info
        setPagination({
          currentPage: animeData.currentPage || 1,
          totalPages: animeData.totalPages || 1,
        });

        setHasMore((animeData.currentPage || 1) < (animeData.totalPages || 1));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId]); // Re-fetch when genreId changes

  // Helper function to sort anime data
  const sortAnimeData = (animeList) => {
    return [...animeList].sort((a, b) => {
      // Prioritize shows with score first
      if (a.score !== 'N/A' && b.score === 'N/A') return -1;
      if (a.score === 'N/A' && b.score !== 'N/A') return 1;

      // Then sort by score
      if (parseFloat(a.score) > parseFloat(b.score)) return -1;
      if (parseFloat(a.score) < parseFloat(b.score)) return 1;

      // If scores are equal or both N/A, sort by release date
      const dateA = a.latestReleaseDate
        ? new Date(a.latestReleaseDate)
        : new Date(0);
      const dateB = b.latestReleaseDate
        ? new Date(b.latestReleaseDate)
        : new Date(0);
      return dateB - dateA;
    });
  };

  const loadMoreAnime = async () => {
    if (loadingMore || pagination.currentPage >= pagination.totalPages) return;

    try {
      setLoadingMore(true);

      // Calculate next page range (load 2 more pages at a time)
      const startPage = pagination.currentPage + 1;
      const endPage = Math.min(
        pagination.currentPage + 2,
        pagination.totalPages
      );

      // Fetch more anime from next pages
      const moreAnime = await fetchMoreAnimebyCategory(
        genreId,
        startPage,
        endPage
      );

      if (Array.isArray(moreAnime) && moreAnime.length > 0) {
        // Format the new anime data
        const formattedMoreData = moreAnime.map(formatAnimeData);

        // Don't sort the new data - just append it
        setShows((prevShows) => [...prevShows, ...formattedMoreData]);

        // Update pagination info
        setPagination((prev) => ({
          ...prev,
          currentPage: endPage,
        }));

        // Check if there are more pages to load
        setHasMore(endPage < pagination.totalPages);
      }
    } catch (error) {
      console.error('Error loading more anime:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePrevSlide = () => {
    setActiveCarouselIndex((prev) =>
      prev === 0 ? shows.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setActiveCarouselIndex((prev) =>
      prev === shows.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return <CategoryPageSkeletonLoader />;
  }

  // Filter shows based on activeFilter
  const filteredShows =
    activeFilter === 'all'
      ? shows
      : activeFilter === 'popular'
      ? shows.filter((show) => parseFloat(show.score) > 7)
      : shows.filter((show) =>
          show.genres.some((genre) => genre.genreId === activeFilter)
        );

  // Pilih top anime untuk carousel
  const featuredAnime = shows
    .filter((show) => parseFloat(show.score) > 7 || show.score === 'N/A')
    .slice(0, 10);

  const carouselShows =
    featuredAnime.length > 0
      ? [featuredAnime[activeCarouselIndex % featuredAnime.length]]
      : filteredShows.length > 0
      ? [filteredShows[0]]
      : [];

  // Get most popular genres for filter buttons (limit to 10)
  const popularGenres = genres.slice(0, 8);

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Featured Carousel */}
      {carouselShows.length > 0 && (
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {carouselShows.map((show) => (
              <div key={show.id} className="flex-shrink-0 w-full snap-center">
                <div className="relative h-[70vh]">
                  {/* Background blurred image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={
                        show.backdropUrl ||
                        '/placeholder.svg?height=600&width=1200'
                      }
                      alt={`${show.title} background`}
                      className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-50 scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                  {/* Content container with poster and info */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 flex gap-8 items-center">
                      {/* Poster image (portrait) */}
                      <div className="relative h-[50vh] w-[35vh] hidden md:block">
                        <img
                          src={
                            show.posterUrl ||
                            '/placeholder.svg?height=450&width=300'
                          }
                          alt={show.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-md shadow-lg"
                        />
                      </div>

                      {/* Show information */}
                      <div className="max-w-lg">
                        <h1 className="text-3xl font-bold">{show.title}</h1>
                        <p className="text-gray-300 mt-2 line-clamp-2">
                          {show.description ||
                            `Episode ${show.episodes || '?'} • ${
                              show.releaseDay || 'Updated'
                            } • ${show.latestReleaseDate || 'Recently'}`}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-yellow-400">
                            ★ {show.score || '?'}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-300">
                            {show.status || 'Ongoing'}
                          </span>
                          {show.genres && show.genres.length > 0 && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-300">
                                {Array.isArray(show.genres)
                                  ? typeof show.genres[0] === 'string'
                                    ? show.genres.slice(0, 2).join(', ')
                                    : show.genres
                                        .slice(0, 2)
                                        .map((g) => g.title || g)
                                        .join(', ')
                                  : 'Drama, Fantasy'}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full">
                            Watch Now
                          </button>
                          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full">
                            + Add to List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation */}
          {featuredAnime.length > 1 && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 19L8 12L15 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Indicators */}
          {featuredAnime.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredAnime.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setActiveCarouselIndex(index)}
                  className={`h-1.5 rounded-full cursor-pointer ${
                    index === activeCarouselIndex % featuredAnime.length
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-gray-500'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Category Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {genres.find((g) => g.genreId === genreId)?.title ||
              genreId.charAt(0).toUpperCase() + genreId.slice(1)}{' '}
            Anime
          </h1>
          <p className="text-gray-400">
            Showing {filteredShows.length} of {pagination.totalPages * 12} anime
          </p>
        </div>

        {/* Show All Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="hidden md:block text-xl font-bold">Filter</h2>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('popular')}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                  activeFilter === 'popular'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                Popular
              </button>

              {/* Genre Filter Buttons */}
              {popularGenres.map((genre) => (
                <button
                  key={genre.genreId}
                  onClick={() => setActiveFilter(genre.genreId)}
                  className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                    activeFilter === genre.genreId
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {genre.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredShows.map((show) => (
              <div key={show.id} className="flex-shrink-0 w-full">
                <ShowBigCard show={show} />
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredShows.length === 0 && !loading && (
            <div className="text-center py-10">
              <p className="text-gray-400">
                No anime found for the selected filter: "
                {activeFilter === 'all'
                  ? 'All'
                  : activeFilter === 'popular'
                  ? 'Popular'
                  : genres.find((g) => g.genreId === activeFilter)?.title ||
                    activeFilter}
                "
              </p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && activeFilter === 'all' && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreAnime}
                disabled={loadingMore}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center space-x-2"
              >
                {loadingMore ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Memuat...</span>
                  </>
                ) : (
                  <>
                    <span>Muat lebih banyak</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Pagination Info */}
          <div className="text-center text-gray-500 text-sm mt-4">
            Menampilkan {filteredShows.length} dari {pagination.totalPages * 12}{' '}
            anime
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
