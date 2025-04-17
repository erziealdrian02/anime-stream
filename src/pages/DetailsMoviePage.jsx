'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetailMovie } from '../lib/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ShowCard from '../components/ShowCard';
import {
  AnimeDetailsSkeletonLoader,
  ExpandedEpisodeSkeleton,
  RecommendationsSkeletonLoader,
} from '../components/SkeletonLoadersDetail';

function DetailsMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    title: '',
    english: '',
    description: '',
    posterUrl: '',
    backdropUrl: '',
    genres: [],
    studios: '',
    producers: '',
    releaseYear: '',
    rating: '',
    duration: '',
    status: '',
  });
  const [episodes, setEpisodes] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [activeTab, setActiveTab] = useState('episodes');
  const [episodeViewMode, setEpisodeViewMode] = useState('list');
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [groupedEpisodes, setGroupedEpisodes] = useState({});
  const [loading, setLoading] = useState({ initial: true, episodes: {} });
  const [error, setError] = useState(null);
  const [moreThanTwenty, setMoreThanTwenty] = useState(false);
  const [expandedEpisode, setExpandedEpisode] = useState(null);
  const [recommendedAnime, setRecommendedAnime] = useState({});
  const formatTitle = (title) => {
    // Ganti '-' dengan spasi
    const titleWithSpaces = title.replace(/-/g, ' ');

    // Ubah setiap kata menjadi kapital pada huruf pertamanya
    return titleWithSpaces
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    const loadAnimeDetails = async () => {
      try {
        setLoading((prev) => ({ ...prev, initial: true }));
        const {
          episodes: fetchedEpisodes,
          animeData,
          moreThanTwenty,
        } = await fetchDetailMovie(id);

        // Set the moreThanTwenty flag from the API response
        setMoreThanTwenty(moreThanTwenty);

        // Set initial view mode based on moreThanTwenty flag
        setEpisodeViewMode(moreThanTwenty ? 'dropdown' : 'list');

        if (animeData) {
          // Pastikan description adalah string, bukan objek
          const description = Array.isArray(animeData.synopsis.paragraphs) // Memastikan bahwa paragraphs adalah array
            ? animeData.synopsis.paragraphs.join('\n') // Gabungkan para paragraf dengan newline
            : animeData.synopsis.paragraphs || '';

          setShow({
            title: formatTitle(id) || 'Unknown Title',
            english: animeData.english || '',
            description: description,
            posterUrl: animeData.poster || '',
            backdropUrl: animeData.backdropImage || animeData.posterImage || '',
            genres: Array.isArray(animeData.genres) ? animeData.genres : [],
            studios: animeData.studios || 'Unknown Studios',
            producers: animeData.producers || 'Unknown Producers',
            releaseYear: animeData.season || 'Unknown ReleaseYear',
            rating: animeData.score.value || 'N/A',
            duration: animeData.duration || 'Unknown Duration',
            status: animeData.status || 'Unknown Status',
          });

          // Set related shows if available
          if (animeData.relatedAnime && Array.isArray(animeData.relatedAnime)) {
            setRelatedShows(animeData.relatedAnime);
          } else {
            // Placeholder related shows if not available
            setRelatedShows([]);
          }
        }

        if (
          fetchedEpisodes &&
          Array.isArray(fetchedEpisodes) &&
          fetchedEpisodes.length > 0
        ) {
          // Pastikan setiap episode punya properti description bertipe string
          const sanitizedEpisodes = fetchedEpisodes.map((episode) => ({
            ...episode,
            description:
              typeof episode.description === 'object'
                ? JSON.stringify(episode.description)
                : episode.description || 'No description available',
            title:
              episode.title ||
              `Episode ${
                episode.episodeNumber || episode.episodeId || 'Unknown'
              }`,
          }));
          // console.log('fetchedEpisodes', fetchedEpisodes);

          setEpisodes(sanitizedEpisodes);

          // Group episodes by season or other criteria
          const grouped = groupEpisodes(sanitizedEpisodes);
          setGroupedEpisodes(grouped);

          // Expand the first season by default
          const firstSeason = Object.keys(grouped)[0];
          if (firstSeason) {
            setExpandedSeason(firstSeason);
          }
        }
      } catch (err) {
        console.error('Error loading anime details:', err);
        setError('Failed to load anime details. Please try again later.');
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    loadAnimeDetails();
  }, [id]);

  // Function to group episodes by season or chunks if needed
  const groupEpisodes = (episodeList) => {
    if (!episodeList || episodeList.length === 0) return {};

    // If episodes have season information, group by season
    if (episodeList[0].season) {
      return episodeList.reduce((groups, episode) => {
        const season = episode.season || 'Season 1';
        if (!groups[season]) {
          groups[season] = [];
        }
        groups[season].push(episode);
        return groups;
      }, {});
    }

    // Otherwise group in chunks of 25 episodes
    const groupSize = 25;
    return episodeList.reduce((groups, episode, index) => {
      const groupIndex = Math.floor(index / groupSize);
      const groupName = `Season ${groupIndex + 1}`;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(episode);
      return groups;
    }, {});
  };

  const toggleSeason = (season) => {
    if (expandedSeason === season) {
      setExpandedSeason(null);
    } else {
      setExpandedSeason(season);
    }
  };

  const fetchMoreAnime = async (episodeId) => {
    try {
      setLoading((prev) => ({
        ...prev,
        episodes: { ...prev.episodes, [episodeId]: true },
      }));
      const response = await fetch(
        `http://ponflix-api.vercel.app/samehadaku/episode/${episodeId}`
      );
      const data = await response.json();

      if (data.ok && data.data.recommendedEpisodeList) {
        setRecommendedAnime((prev) => ({
          ...prev,
          [episodeId]: data.data.recommendedEpisodeList,
        }));
      }
    } catch (error) {
      console.error('Error fetching recommended anime:', error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        episodes: { ...prev.episodes, [episodeId]: false },
      }));
    }
  };

  const toggleEpisode = (episodeId) => {
    const newExpandedEpisode = expandedEpisode === episodeId ? null : episodeId;
    setExpandedEpisode(newExpandedEpisode);

    // Fetch data when opening if we don't have it yet
    if (newExpandedEpisode && !recommendedAnime[episodeId]) {
      fetchMoreAnime(episodeId);
    }
  };

  const handleWatchNow = () => {
    // Navigate to the first episode if available
    if (episodes.length > 0) {
      navigate(`/watch/movie/${id}?ep=${episodes[0].episodeId}`);
    }
  };

  // Helper untuk menampilkan konten yang mungkin berupa objek
  const renderContent = (content) => {
    if (typeof content === 'object' && content !== null) {
      // Jika objek memiliki paragraphs (mungkin dari suatu struktur API)
      if (Array.isArray(content.paragraphs)) {
        return content.paragraphs.join('\n');
      }
      return JSON.stringify(content);
    }
    return content;
  };

  if (loading.initial) {
    return <AnimeDetailsSkeletonLoader />;
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-16">
      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full">
        <img
          src={show.posterUrl || '/placeholder.svg?height=600&width=1200'}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover brightness-25 backdrop-blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="container mx-auto flex flex-col md:flex-row gap-8 items-end">
            <div className="relative h-48 w-32 md:h-64 md:w-44 flex-shrink-0">
              <img
                src={show.posterUrl || '/placeholder.svg?height=384&width=256'}
                alt={show.title}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{show.title}</h1>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(show.genres) &&
                  show.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {renderContent(genre)}
                    </Badge>
                  ))}
              </div>
              <p className="text-gray-300 max-w-2xl line-clamp-3">
                {renderContent(show.description)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleWatchNow}
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
                <Button onClick={handleWatchNow} variant="outline">
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex space-x-6">
            <button
              className={`pb-3 px-1 text-sm font-medium ${
                activeTab === 'episodes'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('episodes')}
            >
              Episodes
            </button>
            <button
              className={`pb-3 px-1 text-sm font-medium ${
                activeTab === 'details'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            {/* <button
              className={`pb-3 px-1 text-sm font-medium ${
                activeTab === 'related'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('related')}
            >
              More Like This
            </button> */}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'episodes' && (
            <div>
              {/* List View */}
              <div className="space-y-4">
                {/* {console.log('Ini Episodessssssss', episodes)} */}
                {episodes.map((episode, index) => (
                  <div
                    key={`episode-list-${episode.episodeId || index}`}
                    className="flex gap-4 p-4 rounded-md bg-gray-900 hover:bg-gray-800 cursor-pointer"
                    onClick={() =>
                      navigate(`/watch/movie/${id}?ep=${episode.episodeId}`)
                    }
                  >
                    <div className="relative w-40 aspect-video flex-shrink-0">
                      {/* <h1>${episode.episodeId}</h1> */}
                      <img
                        src={
                          show.posterUrl ||
                          '/placeholder.svg?height=180&width=320'
                        }
                        alt={renderContent(episode.title)}
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
                        {show.duration || ''}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {renderContent(episode.title)}
                      </h4>
                      {/* <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                        {renderContent(show.description)}
                      </p> */}
                      <div className="mt-2 text-xs text-gray-500">
                        {episode.releaseDate || 'Unknown release date'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">English Title</h3>
                <p className="text-xl text-gray-300">
                  {renderContent(show.english)}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                <p className="text-gray-300">
                  {renderContent(show.description)}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Producer</h3>
                <p className="text-gray-300">{renderContent(show.producers)}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Studios</h3>
                <p className="text-gray-300">{renderContent(show.studios)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Release Year</h3>
                  <p className="text-gray-300">
                    {renderContent(show.releaseYear)}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Rating</h3>
                  <p className="text-gray-300">{renderContent(show.rating)}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-gray-300">
                    {renderContent(show.duration)}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-gray-300">{renderContent(show.status)}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.isArray(relatedShows) && relatedShows.length > 0 ? (
                  relatedShows.map((relatedShow, index) => (
                    <ShowCard
                      key={`related-${relatedShow.id || index}`}
                      show={relatedShow}
                      showTitle
                      showRating
                    />
                  ))
                ) : (
                  <p className="text-gray-400 col-span-full">
                    No related shows available
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsMoviePage;
