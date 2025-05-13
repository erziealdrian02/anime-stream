// The key issue is in how we handle the episodes display and grouping
// Here's the updated DetailsPage.jsx with fixed episode grouping and display

'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDetailAnime } from '../lib/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ShowCard from '../components/ShowCard';
import {
  AnimeDetailsSkeletonLoader,
  ExpandedEpisodeSkeleton,
  RecommendationsSkeletonLoader,
} from '../components/SkeletonLoadersDetail';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    title: '',
    english: '',
    japanese: '',
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
    // Replace '-' with spaces
    const titleWithSpaces = title.replace(/-/g, ' ');

    // Capitalize first letter of each word
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
          batchDetails,
          moreThanTwenty,
          groupedEpisodes: fetchedGroupedEpisodes, // Get the grouped episodes from API
        } = await fetchDetailAnime(id);

        // Set the moreThanTwenty flag from the API response
        setMoreThanTwenty(moreThanTwenty);

        // Set initial view mode based on moreThanTwenty flag
        setEpisodeViewMode(moreThanTwenty ? 'dropdown' : 'list');

        // Extract title from URL/ID if needed
        const extractTitleFromUrl = (url) => {
          // Get the last part of the URL after the last slash
          const urlParts = url.split('/');
          const lastPart = urlParts[urlParts.length - 1];

          // Replace hyphens with spaces and capitalize each word
          return lastPart
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        };

        if (animeData) {
          // Make sure description is a string, not an object
          const description = Array.isArray(animeData.synopsis.paragraphs)
            ? animeData.synopsis.paragraphs.join('\n')
            : animeData.synopsis.paragraphs || '';

          setShow({
            title: animeData.title || extractTitleFromUrl(id),
            english: animeData.english || '',
            japanese: animeData.japanese || '',
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
            downloadUrl: batchDetails?.downloadUrl || [],
            recommendedAnimeList:
              animeData.recommendedAnimeList || 'Unknown Recommended',
          });

          // Set related shows if available
          if (animeData.relatedAnime && Array.isArray(animeData.relatedAnime)) {
            setRelatedShows(animeData.relatedAnime);
          } else {
            // Placeholder related shows if not available
            setRelatedShows([]);
          }
        } else {
          // If no animeData is available, use the URL ID to set the title
          setShow((prev) => ({
            ...prev,
            title: extractTitleFromUrl(id),
          }));
        }

        if (
          fetchedEpisodes &&
          Array.isArray(fetchedEpisodes) &&
          fetchedEpisodes.length > 0
        ) {
          // Make sure each episode has a description property as a string
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

          setEpisodes(sanitizedEpisodes);

          // Important: Use the grouped episodes from API if available, otherwise group them locally
          if (
            fetchedGroupedEpisodes &&
            Object.keys(fetchedGroupedEpisodes).length > 0
          ) {
            setGroupedEpisodes(fetchedGroupedEpisodes);
          } else {
            // Group episodes locally as a fallback
            const grouped = groupEpisodes(sanitizedEpisodes);
            setGroupedEpisodes(grouped);
          }

          // Expand the first season/group by default
          const firstGroup =
            Object.keys(fetchedGroupedEpisodes)[0] ||
            Object.keys(groupEpisodes(sanitizedEpisodes))[0];
          if (firstGroup) {
            setExpandedEpisode(firstGroup);
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

  // Group episodes by season or chunks - used as a fallback
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
      const startEp = groupIndex * groupSize + 1;
      const endEp = Math.min((groupIndex + 1) * groupSize, episodeList.length);
      const groupName = `Episode ${startEp}-${endEp}`;

      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(episode);
      return groups;
    }, {});
  };

  const toggleEpisode = (episodeId) => {
    const newExpandedEpisode = expandedEpisode === episodeId ? null : episodeId;
    setExpandedEpisode(newExpandedEpisode);

    // Fetch data when opening if we don't have it yet
    if (newExpandedEpisode && !recommendedAnime[episodeId]) {
      fetchMoreAnime(episodeId);
    }
  };

  const fetchMoreAnime = async (episodeId) => {
    try {
      setLoading((prev) => ({
        ...prev,
        episodes: { ...prev.episodes, [episodeId]: true },
      }));
      const response = await fetch(
        `https://wenime-api.vercel.app/samehadaku/episode/${episodeId}`
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

  const handleWatchNow = () => {
    // Navigate to the first episode if available
    if (episodes.length > 0) {
      navigate(`/watch/${id}?ep=${episodes[0].episodeId}`);
    }
  };

  // Helper to display content that might be an object
  const renderContent = (content) => {
    if (typeof content === 'object' && content !== null) {
      // If object has paragraphs (possibly from API structure)
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
                {/* <Button variant="outline">
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
                  Add to List
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 11V17M12 8V17M17 14V17M8 7.8L12 4L16 7.8M3 20H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button> */}
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
            {show.downloadUrl && show.downloadUrl.length > 0 && (
              <button
                className={`pb-3 px-1 text-sm font-medium ${
                  activeTab === 'download'
                    ? 'text-white border-b-2 border-primary'
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('download')}
              >
                Download Batch
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'episodes' && (
            <div>
              {/* View Mode Toggle */}
              {/* {moreThanTwenty && (
                <div className="mb-4 flex justify-end">
                  <div className="bg-gray-900 p-1 rounded-md inline-flex">
                    <button
                      onClick={() => setEpisodeViewMode('dropdown')}
                      className={`px-3 py-1 text-sm rounded-md ${
                        episodeViewMode === 'dropdown'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300'
                      }`}
                    >
                      Grouped
                    </button>
                    <button
                      onClick={() => setEpisodeViewMode('list')}
                      className={`px-3 py-1 text-sm rounded-md ${
                        episodeViewMode === 'list'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300'
                      }`}
                    >
                      List All
                    </button>
                  </div>
                </div>
              )} */}

              {/* List View - Single episodes */}
              {(!moreThanTwenty || episodeViewMode === 'list') && (
                <div className="space-y-4">
                  {episodes.map((episode, index) => (
                    <div
                      key={`episode-list-${episode.episodeId || index}`}
                      className="flex gap-4 p-4 rounded-md bg-gray-900 hover:bg-gray-800 cursor-pointer"
                      onClick={() =>
                        navigate(`/watch/${id}?ep=${episode.episodeId}`)
                      }
                    >
                      <div className="relative w-40 aspect-video flex-shrink-0">
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
                        <div className="mt-2 text-xs text-gray-500">
                          {episode.releaseTime || 'Unknown release date'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown View - Grouped episodes */}
              {moreThanTwenty && episodeViewMode === 'dropdown' && (
                <div className="space-y-2">
                  {Object.keys(groupedEpisodes).map((groupName) => (
                    <div
                      key={`group-${groupName}`}
                      className="border border-gray-800 rounded-md overflow-hidden"
                    >
                      <div
                        className="bg-gray-900 p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleEpisode(`group-${groupName}`)}
                      >
                        <h3 className="font-medium">{groupName}</h3>
                        <svg
                          className={`h-5 w-5 transition-transform ${
                            expandedEpisode === `group-${groupName}`
                              ? 'transform rotate-180'
                              : ''
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Expanded episode list */}
                      {expandedEpisode === `group-${groupName}` && (
                        <div className="bg-gray-800/50 p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {groupedEpisodes[groupName].map((episode) => (
                              <div
                                key={episode.episodeId}
                                className="border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors"
                              >
                                <div
                                  className="p-3 flex items-center gap-3 cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/watch/${id}?ep=${episode.episodeId}`
                                    )
                                  }
                                >
                                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                                    <img
                                      src={
                                        episode.poster ||
                                        show.posterUrl ||
                                        '/placeholder.svg?height=80&width=80'
                                      }
                                      alt={renderContent(episode.title)}
                                      className="absolute inset-0 w-full h-full object-cover rounded"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm sm:text-base truncate">
                                      Episode {renderContent(episode.title)}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Episode {renderContent(episode.title)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                      <span>
                                        {episode.duration ||
                                          show.duration ||
                                          '24 min'}
                                      </span>
                                      <span className="inline-block w-1 h-1 bg-gray-500 rounded-full"></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                <h3 className="text-xl font-semibold mb-2">Japanese Title</h3>
                <p className="text-xl text-gray-300">
                  {renderContent(show.japanese)}
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

          {activeTab === 'download' && (
            <div className="py-4">
              {show.downloadUrl &&
                show.downloadUrl.map((downloadUrl, qIndex) => (
                  <div key={downloadUrl.title || qIndex}>
                    <h3 className="text-lg font-semibold mb-3">
                      {downloadUrl.title}
                    </h3>
                    {downloadUrl.qualities &&
                    downloadUrl.qualities.length > 0 ? (
                      downloadUrl.qualities.map((quality, uIndex) => (
                        <div key={uIndex} className="space-y-3">
                          <div className="bg-gray-900 p-3 rounded-md mb-3">
                            <h4 className="font-medium mb-2">
                              {quality.title}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                              {quality.urls && quality.urls.length > 0 ? (
                                quality.urls.map((urlItem, urlIndex) => (
                                  <a
                                    key={urlIndex}
                                    href={urlItem.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 hover:bg-gray-700 text-center py-2 rounded-md text-sm transition-colors"
                                  >
                                    {urlItem.title}
                                  </a>
                                ))
                              ) : (
                                <div className="text-gray-500 col-span-2">
                                  Tidak ada link tersedia
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 col-span-2">
                        Tidak ada link tersedia
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
