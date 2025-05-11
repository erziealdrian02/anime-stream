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
          batchDetails,
          moreThanTwenty,
        } = await fetchDetailAnime(id);

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
            title: animeData.title || 'Unknown Title',
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
            downloadUrl: batchDetails?.downloadUrl || [],
            recommendedAnimeList:
              animeData.recommendedAnimeList || 'Unknown Recomended',
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
        `http://wenime-api.vercel.app/samehadaku/episode/${episodeId}`
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
      navigate(`/watch/${id}?ep=${episodes[0].episodeId}`);
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
                <Button variant="outline">
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
            {/* {console.log('show.downloadUrl', show.downloadUrl)} */}

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

            <button
              className={`pb-3 px-1 text-sm font-medium ${
                activeTab === 'related'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('related')}
            >
              More Like This
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'episodes' && (
            <div>
              {/* List View */}
              {(!moreThanTwenty || episodeViewMode === 'list') && (
                <div className="space-y-4">
                  {/* {console.log('Ini Episodessssssss', episodes)} */}
                  {episodes.map((episode, index) => (
                    <div
                      key={`episode-list-${episode.episodeId || index}`}
                      className="flex gap-4 p-4 rounded-md bg-gray-900 hover:bg-gray-800 cursor-pointer"
                      onClick={() =>
                        navigate(`/watch/${id}?ep=${episode.episodeId}`)
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
                        <div className="mt-2 text-xs text-gray-500">
                          {episode.releaseTime || 'Unknown release date'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown View - Only shown if moreThanTwenty is true */}
              {moreThanTwenty && episodeViewMode === 'dropdown' && (
                <div className="space-y-2">
                  {Object.values(groupedEpisodes)
                    .flat()
                    .map((episode, index) => {
                      // Create a unique key using index and episodeId
                      const episodeKey = `${episode.episodeId || index}`;
                      return (
                        <div
                          key={episodeKey}
                          className="border border-gray-800 rounded-md overflow-hidden"
                        >
                          <div
                            className="bg-gray-900 p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleEpisode(episodeKey)}
                          >
                            <h3 className="font-medium">
                              {episode.episodeNumber || index + 1}.{' '}
                              {renderContent(episode.title)}
                            </h3>
                            <svg
                              className={`h-5 w-5 transition-transform ${
                                expandedEpisode === episodeKey
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

                          {expandedEpisode === episodeKey && (
                            <div className="bg-gray-800/50 p-4">
                              <div className="flex gap-4 mb-4">
                                <div className="relative w-32 aspect-video flex-shrink-0">
                                  <img
                                    src={
                                      episode.poster ||
                                      '/placeholder.svg?height=180&width=320'
                                    }
                                    alt={renderContent(episode.title)}
                                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                                  />
                                  <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
                                    {episode.duration || '24 min'}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-400 mt-1">
                                    {renderContent(episode.description) ||
                                      'No description available'}
                                  </p>
                                  <div className="mt-2 text-xs text-gray-500">
                                    {episode.releaseDate ||
                                      'Unknown release date'}
                                  </div>
                                  <button
                                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/watch/${id}?ep=${episode.episodeId}`
                                      );
                                    }}
                                  >
                                    Watch
                                  </button>
                                </div>
                              </div>

                              {/* Recommended Anime Section */}
                              <div className="mt-4 border-t border-gray-700 pt-4">
                                <h4 className="text-sm font-medium mb-3">
                                  Recommended Anime
                                </h4>

                                {loading.episodes[episodeKey] ? (
                                  <RecommendationsSkeletonLoader />
                                ) : recommendedAnime[episodeKey] &&
                                  recommendedAnime[episodeKey].length > 0 ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {recommendedAnime[episodeKey].map(
                                      (anime, idx) => (
                                        <div
                                          key={`rec-${episodeKey}-${idx}`}
                                          className="flex gap-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(
                                              `/watch/${anime.id}?ep=${
                                                anime.episodeId || ''
                                              }`
                                            );
                                          }}
                                        >
                                          <div className="relative w-16 h-12 flex-shrink-0">
                                            <img
                                              src={
                                                anime.poster ||
                                                '/placeholder.svg?height=90&width=160'
                                              }
                                              alt={anime.title}
                                              className="absolute inset-0 w-full h-full object-cover rounded"
                                            />
                                          </div>
                                          <div className="flex-1 overflow-hidden">
                                            <p className="text-xs font-medium truncate">
                                              {anime.title}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                              {anime.episodeNumber
                                                ? `Episode ${anime.episodeNumber}`
                                                : 'Unknown episode'}
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-xs text-gray-400 text-center py-2">
                                    No recommendations available
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                {/* {show.recommendedAnimeList &&
                  show.recommendedAnimeList &&
                  show.recommendedAnimeList.map((recommended) => (
                    <Link
                      to={`/details/${recommended.animeId}`}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                        <img
                          src={
                            recommended.posterUrl ||
                            '/placeholder.svg?height=450&width=300'
                          }
                          alt={recommended.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {recommended.isVip && (
                          <div className="absolute top-1 right-1 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded">
                            VIP
                          </div>
                        )}
                        {recommended.isNew && (
                          <div className="absolute top-1 left-1 bg-red-500 text-xs font-bold px-1 py-0.5 rounded">
                            NEW
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                          <div className="text-xs font-medium line-clamp-2">
                            {recommended.title}
                          </div>
                          {showRating && (
                            <div className="flex items-center mt-1">
                              <span className="text-yellow-400 text-xs">★</span>
                              <span className="text-xs ml-1">
                                {recommended.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {showTitle && (
                        <div className="mt-1">
                          <h3 className="text-sm font-medium line-clamp-1">
                            {recommended.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {recommended.type === 'drama'
                              ? 'Fantasy Melodrama'
                              : 'Variety Show'}
                          </p>
                        </div>
                      )}
                    </Link>
                  ))} */}
                {console.log('show.recommendedAnimeList', show)}

                {Array.isArray(show.recommendedAnimeList) &&
                show.recommendedAnimeList.length > 0 ? (
                  show.recommendedAnimeList.map((relatedShow) => (
                    <ShowCard
                      key={`related-${relatedShow.animeId}`}
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

          {activeTab === 'download' && (
            <div className="py-4">
              {show.downloadUrl &&
                show.downloadUrl &&
                show.downloadUrl.map((downloadUrl, qIndex) => (
                  <div key={downloadUrl.title || qIndex}>
                    <h3 className="text-lg font-semibold mb-3">
                      {downloadUrl.title}
                    </h3>
                    {downloadUrl.qualities &&
                    downloadUrl.qualities.length > 0 ? (
                      downloadUrl.qualities.map((quality, uIndex) => (
                        <div className="space-y-3">
                          <div className="bg-gray-900 p-3 rounded-md mb-3">
                            <h4 className="font-medium mb-2">
                              {quality.title}
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
