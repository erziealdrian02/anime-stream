'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ShowMovieCard from '../components/ShowMovieCard';
import { fetchEpisodeMovie, fetchStreamMovie } from '../lib/api';
import VideoMoviePlayer from '../components/VideoMoviePlayer';
import WatchPageSkeleton from '../components/loader/WatchPageSkeleton';

function getEpisodeIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const episodeId = urlParams.get('ep');
  return episodeId;
}

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    title: '',
    animeId: '',
    poster: '',
    releasedOn: '',
    defaultStreamingUrl: '',
    genres: [],
    watchServer: [],
    downloadServer: [],
  });
  const [episodes, setEpisodes] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('download');
  const [isExpanded, setIsExpanded] = useState(false);

  // New states for video player
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedServer, setSelectedServer] = useState('');
  const [availableQualities, setAvailableQualities] = useState([]);

  // Track the current episode ID from URL
  const [currentEpisodeId, setCurrentEpisodeId] = useState(
    getEpisodeIdFromUrl()
  );

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to get the best available quality
  const getBestQuality = (watchServer) => {
    // Order of preference: 1080p, 720p, 480p, 360p
    const qualityOrder = ['1080p', '720p', '480p', '360p'];

    for (const quality of qualityOrder) {
      const qualityItem = watchServer.find((q) => q.title === quality);
      if (
        qualityItem &&
        qualityItem.serverList &&
        qualityItem.serverList.length > 0
      ) {
        return {
          quality: quality,
          server: qualityItem.serverList[0],
        };
      }
    }

    // If no preferred quality is found, return the first one that has servers
    for (const item of watchServer) {
      if (item.serverList && item.serverList.length > 0) {
        return {
          quality: item.title,
          server: item.serverList[0],
        };
      }
    }

    return null;
  };

  // Function to load video from selected server
  const loadVideo = async (serverId) => {
    if (!serverId) return;

    try {
      setVideoLoading(true);
      const streamData = await fetchStreamMovie(serverId);
      if (streamData && streamData.url) {
        setVideoUrl(streamData.url);
      } else {
        console.error('No valid streaming URL found');
      }
    } catch (error) {
      console.error('Error loading video:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  // Prepare available qualities from watchServer
  useEffect(() => {
    if (show.watchServer && show.watchServer.length > 0) {
      // Filter out qualities that have servers
      const qualities = show.watchServer.filter(
        (q) => q.serverList && q.serverList.length > 0
      );
      setAvailableQualities(qualities);

      // Auto-select the best quality
      const bestQuality = getBestQuality(show.watchServer);
      if (bestQuality) {
        setSelectedQuality(bestQuality.quality);
        setSelectedServer(bestQuality.server);
        loadVideo(bestQuality.server.serverId);
      }
    }
  }, [show.watchServer]);

  // Handle quality change
  const handleQualityChange = (quality) => {
    const qualityItem = show.watchServer.find((q) => q.title === quality);
    if (
      qualityItem &&
      qualityItem.serverList &&
      qualityItem.serverList.length > 0
    ) {
      setSelectedQuality(quality);
      setSelectedServer(qualityItem.serverList[0]);
      loadVideo(qualityItem.serverList[0].serverId);
    }
  };

  // Handle server change
  const handleServerChange = (server) => {
    setSelectedServer(server);
    loadVideo(server.serverId);
  };

  // Listen for URL changes to detect when episode ID changes
  useEffect(() => {
    const handleUrlChange = () => {
      const newEpisodeId = getEpisodeIdFromUrl();
      if (newEpisodeId !== currentEpisodeId) {
        setCurrentEpisodeId(newEpisodeId);
        setLoading(true);
        // Reset video states when changing episodes
        setVideoUrl('');
        setSelectedQuality('');
        setSelectedServer('');
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleUrlChange);

    // Check for URL changes on component mount
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [currentEpisodeId]);

  // Main data loading effect - now depends on currentEpisodeId
  useEffect(() => {
    const loadAnimeEpisodes = async () => {
      try {
        setLoading(true);
        // Get episode ID from URL
        const episodeId = currentEpisodeId;
        if (!episodeId) return;

        const animeData = await fetchEpisodeMovie(episodeId);

        if (animeData) {
          // Make sure description is a string, not an object
          const description = Array.isArray(animeData.synopsis?.paragraphs)
            ? animeData.synopsis.paragraphs.join('\n')
            : animeData.synopsis?.paragraphs || '';

          setShow({
            title: animeData.title || 'Unknown Title',
            id: animeData.animeId || '',
            description: description,
            posterUrl: animeData.poster || '',
            genres: Array.isArray(animeData.genreList)
              ? animeData.genreList
              : [],
            watchServer: Array.isArray(animeData.server.qualities)
              ? animeData.server.qualities
              : [],
            downloadServer: Array.isArray(animeData.downloadUrl.formats)
              ? animeData.downloadUrl.formats
              : [],
            releasedOn: animeData.releasedOn || 'Unknown Studios',
            defaultStreamingUrl:
              animeData.defaultStreamingUrl || 'Unknown Producers',
          });

          // Set episodes from recommendedEpisodeList
          if (
            animeData.recommendedEpisodeList &&
            Array.isArray(animeData.recommendedEpisodeList)
          ) {
            setEpisodes(
              animeData.recommendedEpisodeList.map((episode) => {
                // Extract just the episode ID from the href path
                const episodeIdFromHref = episode.href.split('/').pop();

                return {
                  id: episode.episodeId,
                  title: episode.title,
                  thumbnailUrl: episode.poster,
                  releaseDate: episode.releaseDate,
                  episodeId: episodeIdFromHref, // Use the extracted ID here
                  duration: '24 min', // Default duration since it's not in the data
                };
              })
            );

            // Find and set current episode based on episodeId
            const currentEp = animeData.recommendedEpisodeList.find(
              (ep) => ep.href.split('/').pop() === episodeId
            );

            if (currentEp) {
              setCurrentEpisode({
                id: currentEp.episodeId,
                title: currentEp.title,
                thumbnailUrl: currentEp.poster,
                releaseDate: currentEp.releaseDate,
                episodeId: episodeId,
                duration: '24 min',
              });
            } else if (animeData.recommendedEpisodeList.length > 0) {
              // Fallback to first episode if current not found
              const firstEpisodeIdFromHref =
                animeData.recommendedEpisodeList[0].href.split('/').pop();

              setCurrentEpisode({
                id: animeData.recommendedEpisodeList[0].episodeId,
                title: animeData.recommendedEpisodeList[0].title,
                thumbnailUrl: animeData.recommendedEpisodeList[0].poster,
                releaseDate: animeData.recommendedEpisodeList[0].releaseDate,
                episodeId: firstEpisodeIdFromHref,
                duration: '24 min',
              });
            }
          }

          // Set related shows from movie.animeList
          if (
            animeData.movie &&
            animeData.movie.animeList &&
            Array.isArray(animeData.movie.animeList)
          ) {
            // Filter out entries with empty titles
            const validShows = animeData.movie.animeList.filter(
              (show) => show.title
            );
            setRelatedShows(
              validShows.map((show) => ({
                id: show.animeId,
                title: show.title,
                posterUrl: show.poster,
                score: show.score,
                href: show.href,
                status: show.status,
                type: show.type,
                isNew: false,
                isVip: false,
                genres: show.genreList.map((genre) => ({
                  title: genre.title,
                  genreId: genre.genreId,
                })),
              }))
            );
          } else {
            setRelatedShows([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimeEpisodes();
  }, [currentEpisodeId]); // This dependency ensures the effect runs when episodeId changes

  // Add custom click handler for episode links to avoid full page reloads
  const handleEpisodeClick = (e, episodeId) => {
    e.preventDefault();
    navigate(`/watch/${show.id}?ep=${episodeId}`);
    setCurrentEpisodeId(episodeId);
  };

  if (loading) {
    return <WatchPageSkeleton />;
  }

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="lg:w-3/4">
          <div className="relative aspect-video bg-black">
            {videoLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="h-12 w-12 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : videoUrl ? (
              <VideoMoviePlayer
                src={videoUrl}
                title={currentEpisode?.title || show.title}
              />
            ) : (
              <>
                <img
                  src={
                    currentEpisode?.thumbnailUrl ||
                    '/placeholder.svg?height=720&width=1280'
                  }
                  alt={currentEpisode?.title || show.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
                    onClick={() => {
                      const bestQuality = getBestQuality(show.watchServer);
                      if (bestQuality) {
                        setSelectedQuality(bestQuality.quality);
                        setSelectedServer(bestQuality.server);
                        loadVideo(bestQuality.server.serverId);
                      }
                    }}
                  >
                    <svg
                      className="h-12 w-12 fill-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quality and Server selection */}
          {availableQualities.length > 0 && (
            <div className="bg-gray-900 p-3 rounded-md mt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-gray-400">Quality:</span>
                {availableQualities.map((quality) => (
                  <button
                    key={quality.title}
                    onClick={() => handleQualityChange(quality.title)}
                    className={`px-3 py-1 text-sm rounded ${
                      selectedQuality === quality.title
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {quality.title}
                  </button>
                ))}
              </div>
              {selectedQuality && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-400">Server:</span>
                  {show.watchServer
                    .find((q) => q.title === selectedQuality)
                    ?.serverList.map((server) => (
                      <button
                        key={server.serverId}
                        onClick={() => handleServerChange(server)}
                        className={`px-3 py-1 text-sm rounded ${
                          selectedServer &&
                          selectedServer.serverId === server.serverId
                            ? 'bg-primary text-white'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        {server.title}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Show Info */}
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold">{show.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {show.genres.map((genre, index) => (
                    <Link
                      key={index}
                      to={`/category/${genre.genreId || '#'}`}
                      className="text-sm bg-gray-800 px-2 py-0.5 rounded hover:bg-gray-600 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {genre.title}
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-bold">Synopsis</h2>
                  <p
                    className={`text-sm text-gray-400 mt-1 ${
                      isExpanded ? '' : 'line-clamp-5'
                    }`}
                  >
                    {show.description}
                  </p>
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 mt-2"
                  >
                    {isExpanded ? 'Tampilkan Lebih Sedikit' : 'Selengkapnya'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex border-b border-gray-800">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeSection === 'download'
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setActiveSection('download')}
                >
                  Download
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeSection === 'recommended'
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setActiveSection('recommended')}
                >
                  Direkomendasikan untukmu
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeSection === 'details'
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setActiveSection('details')}
                >
                  Details
                </button>
              </div>

              {activeSection === 'details' && (
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          English Title
                        </h3>
                        <p className="text-xl text-gray-300">{show.title}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                        <p className="text-gray-300">{show.description}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Producer</h3>
                        <p className="text-gray-300">
                          {show.defaultStreamingUrl}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Studios</h3>
                        <p className="text-gray-300">{show.releasedOn}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">Release Year</h3>
                          <p className="text-gray-300">2023</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Rating</h3>
                          <p className="text-gray-300">3.3</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Duration</h3>
                          <p className="text-gray-300">24 min</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Status</h3>
                          <p className="text-gray-300">On Going</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'recommended' && (
                <div
                  className="flex overflow-x-scroll space-x-3 w-full pb-5"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {relatedShows.map((show) => (
                    <div
                      key={show.id}
                      className="flex-shrink-0 w-[150px] md:w-[190px]"
                    >
                      <ShowMovieCard show={show} />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'download' && (
                <div className="py-4">
                  {show.downloadServer.map((server, serverIndex) => (
                    <div key={`server-${serverIndex}`} className="mb-6">
                      <h3 className="text-sm md:text-lg font-semibold mb-3">
                        {server.title}
                      </h3>
                      <div className="space-y-3">
                        {server.qualities &&
                          server.qualities.map((quality, qualityIndex) => (
                            <div
                              key={`quality-${serverIndex}-${qualityIndex}`}
                              className="bg-gray-900 p-3 rounded-md"
                            >
                              <h4 className="font-medium text-sm mb-2">
                                {quality.title}
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {quality.urls &&
                                  quality.urls.map((urlItem, urlIndex) => (
                                    <a
                                      key={`url-${serverIndex}-${qualityIndex}-${urlIndex}`}
                                      href={urlItem.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="bg-gray-800 hover:bg-gray-700 text-center py-2 rounded-md text-sm transition-colors"
                                    >
                                      {urlItem.title}
                                    </a>
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Episode List */}
        <div className="lg:w-1/4 bg-gray-900">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-bold">Episode List</h2>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] custom-scrollbar">
            {episodes.map((episode, index) => (
              <a
                href={`/watch/${show.id}?ep=${episode.episodeId}`}
                onClick={(e) => handleEpisodeClick(e, episode.episodeId)}
                key={episode.id || index}
                className={`p-3 border-b border-gray-800 flex gap-3 cursor-pointer ${
                  currentEpisode &&
                  currentEpisode.episodeId === episode.episodeId
                    ? 'bg-gray-800'
                    : ''
                }`}
              >
                <div className="relative w-24 aspect-video flex-shrink-0">
                  <img
                    src={
                      episode.thumbnailUrl ||
                      '/placeholder.svg?height=180&width=320'
                    }
                    alt={episode.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
                    {episode.duration}
                  </div>
                  <div className="absolute top-0 left-0 bg-black/80 text-xs px-1 rounded">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium line-clamp-2">
                    {episode.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {episode.releaseDate}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchPage;
