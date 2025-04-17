'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchEpisodeAnime, fetchStreamAnime } from '../lib/api';
import VideoPlayer from '../components/VideoPlayer';

function getEpisodeIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const episodeId = urlParams.get('ep');
  return episodeId;
}

function WatchPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('download');

  // These states are for the video player, but we'll keep them for UI consistency even if not implemented
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const [availableQualities, setAvailableQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedServer, setSelectedServer] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Function to toggle description expanded state
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const episodeId = getEpisodeIdFromUrl();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const episodeId = getEpisodeIdFromUrl() || id;

        if (!episodeId) {
          throw new Error('No episode ID found');
        }

        const { originalData, episodesInfo, animeDetails } =
          await fetchEpisodeAnime(episodeId);

        if (!originalData) {
          throw new Error('Failed to fetch episode data');
        }

        // Set the show data
        setShow({
          title: originalData.title || 'Unknown Title',
          animeId: originalData.animeId || '',
          releaseTime: originalData.releaseTime || '',
          description:
            animeDetails?.synopsis?.join('\n\n') || 'No description available',
          info: originalData.info || {},
          watchServer: processServerData(originalData.server),
          downloadUrl: originalData.downloadUrl || {},
          defaultStreamingUrl: originalData.defaultStreamingUrl || '',
        });

        // Process episodes info
        const processedEpisodes = episodesInfo.map((episode, index) => ({
          id: episode.episodeId,
          title: episode.title || `Episode ${index + 1}`,
          duration: episode.duration || '24 min',
          releaseDate: episode.releaseTime || 'Unknown',
          thumbnailUrl:
            animeDetails?.poster || '/placeholder.svg?height=300&width=200',
          episodeId: episode.episodeId,
        }));

        setEpisodes(processedEpisodes);

        // Set current episode
        const currentEpisodeData =
          processedEpisodes.find((ep) => ep.episodeId === episodeId) ||
          processedEpisodes[0];
        setCurrentEpisode(currentEpisodeData);

        // Jika ada defaultStreamingUrl, langsung set sebagai videoUrl
        if (originalData.defaultStreamingUrl) {
          // console.log(
          //   '[STREAMING] Memuat URL streaming default:',
          //   originalData.defaultStreamingUrl
          // );
          // Tambahkan timeout kecil untuk memastikan komponen siap
          setTimeout(() => {
            setVideoUrl(originalData.defaultStreamingUrl);
          }, 100);
        }

        // Set available qualities from server data
        if (originalData.server && originalData.server.qualities) {
          setAvailableQualities(originalData.server.qualities);

          const initialQuality = originalData.server.qualities.find(
            (q) => q.serverList && q.serverList.length > 0
          );
          if (initialQuality) {
            setSelectedQuality(initialQuality.title);
            if (
              initialQuality.serverList &&
              initialQuality.serverList.length > 0
            ) {
              setSelectedServer(initialQuality.serverList[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, episodeId]);

  // Helper function to process server data
  const processServerData = (serverData) => {
    if (!serverData || !serverData.qualities) return [];

    return serverData.qualities.map((quality) => ({
      title: quality.title,
      serverList: quality.serverList || [],
    }));
  };

  // Handle quality change
  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
    const qualityData = show.watchServer.find((q) => q.title === quality);
    if (
      qualityData &&
      qualityData.serverList &&
      qualityData.serverList.length > 0
    ) {
      setSelectedServer(qualityData.serverList[0]);
      // In a real implementation, you'd load the video here
      // loadVideo(qualityData.serverList[0].serverId);
    }
  };

  // Handle server change
  const handleServerChange = (server) => {
    setSelectedServer(server);
    // In a real implementation, you'd load the video here
    // loadVideo(server.serverId);
  };

  // Function to get the best quality server (for play button)
  const getBestQuality = (watchServer) => {
    if (!watchServer || watchServer.length === 0) return null;

    // Try to find 720p quality first
    const hd = watchServer.find((q) => q.title === '720p');
    if (hd && hd.serverList && hd.serverList.length > 0) {
      return { quality: hd.title, server: hd.serverList[0] };
    }

    // Otherwise find any quality with servers
    for (const quality of watchServer) {
      if (quality.serverList && quality.serverList.length > 0) {
        return { quality: quality.title, server: quality.serverList[0] };
      }
    }

    return null;
  };

  // This function would load the video in a real implementation

  const loadVideo = async (serverId) => {
    if (!serverId) return;

    try {
      // console.log(
      //   '[STREAMING] Starting to load video for server ID:',
      //   serverId
      // );
      setVideoLoading(true);

      const streamData = await fetchStreamAnime(serverId);
      // console.log('[STREAMING] Received streaming data:', streamData);

      if (streamData && streamData.url) {
        // console.log('[STREAMING] Setting video URL:', streamData.url);
        setVideoUrl(streamData.url);
      } else {
        console.error('[STREAMING] No valid streaming URL found in response');
      }
    } catch (error) {
      console.error('[STREAMING] Error loading video:', error);
    } finally {
      // console.log('[STREAMING] Finished loading video');
      setVideoLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-center">
          <h2 className="text-xl mb-2">Error Loading Content</h2>
          <p>{error}</p>
          <button
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="lg:w-3/4">
          <div className="relative aspect-video bg-black">
            {videoUrl ? (
              <VideoPlayer
                src={videoUrl}
                title={currentEpisode?.title || show.title}
                poster={currentEpisode?.thumbnailUrl || '/placeholder.svg'}
              />
            ) : (
              // Fallback UI ketika videoUrl belum ada
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => {
                    if (show.defaultStreamingUrl) {
                      setVideoUrl(show.defaultStreamingUrl);
                    } else {
                      const bestQuality = getBestQuality(show.watchServer);
                      if (bestQuality) {
                        loadVideo(bestQuality.server.serverId);
                      }
                    }
                  }}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition"
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
                    ?.serverList.map((server, idx) => (
                      <button
                        key={server.serverId || idx}
                        onClick={() => {
                          // console.log(`Selected Server ID: ${server.serverId}`);
                          handleServerChange(server);
                        }}
                        className={`px-3 py-1 text-sm rounded ${
                          selectedServer &&
                          selectedServer.serverId === server.serverId
                            ? 'bg-primary text-white'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        {server.title || `Server ${idx + 1}`}
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
                  {show.info &&
                    show.info.genreList &&
                    show.info.genreList.map((genre, index) => (
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
                      isExpanded ? '' : 'line-clamp-2'
                    }`}
                  >
                    {show.description ||
                      'No synopsis available for this anime.'}
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
                    activeSection === 'detailinfo'
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setActiveSection('detailinfo')}
                >
                  Detail Info
                </button>
              </div>

              {activeSection === 'detailinfo' && (
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Title</h3>
                        <p className="text-xl text-gray-300">{show.title}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Credit</h3>
                        <p className="text-gray-300">
                          {show.info?.credit || 'Unknown'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Encoder</h3>
                        <p className="text-gray-300">
                          {show.info?.encoder || 'Unknown'}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">Duration</h3>
                          <p className="text-gray-300">
                            {show.info?.duration || 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Type</h3>
                          <p className="text-gray-300">
                            {show.info?.type || 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Release</h3>
                          <p className="text-gray-300">
                            {show.releaseTime || 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Status</h3>
                          <p className="text-gray-300">
                            {show.title.includes('End')
                              ? 'Completed'
                              : 'Ongoing'}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {show.info &&
                            show.info.genreList &&
                            show.info.genreList.map((genre, index) => (
                              <Link
                                key={index}
                                to={`/category/${genre.genreId || '#'}`}
                                className="text-sm bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition"
                              >
                                {genre.title}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'download' && (
                <div className="py-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Download</h3>
                    <div className="space-y-3">
                      {show.downloadUrl &&
                        show.downloadUrl.qualities &&
                        show.downloadUrl.qualities.map((quality, qIndex) => (
                          <div
                            key={quality.title || qIndex}
                            className="bg-gray-900 p-3 rounded-md mb-3"
                          >
                            <h4 className="font-medium mb-2">
                              {quality.title}{' '}
                              {quality.size && `(${quality.size})`}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                              {quality.urls && quality.urls.length > 0 ? (
                                quality.urls.map((urlItem, uIndex) => (
                                  <a
                                    key={uIndex}
                                    href={urlItem.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 hover:bg-gray-700 text-center py-2 rounded-md text-sm transition-colors"
                                  >
                                    {urlItem.title || `Link ${uIndex + 1}`}
                                  </a>
                                ))
                              ) : (
                                <div className="text-gray-500 col-span-2">
                                  Tidak ada link tersedia
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
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
              <Link
                to={`/watch/${show.animeId}?ep=${episode.episodeId}`}
                key={episode.id || index}
                className={`p-3 border-b border-gray-800 flex gap-3 cursor-pointer ${
                  currentEpisode && currentEpisode.id === episode.id
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchPage;
