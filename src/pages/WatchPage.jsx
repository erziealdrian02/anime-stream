'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowDetails, getEpisodes, getRelatedShows } from '../lib/api';

function WatchPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be actual API calls
        const showData = await getShowDetails(id);
        const episodesData = await getEpisodes(id);
        const relatedData = await getRelatedShows(id);

        setShow(showData);
        setEpisodes(episodesData);
        setRelatedShows(relatedData);
        setCurrentEpisode(episodesData[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!show || !currentEpisode) {
    return (
      <div className="container mx-auto px-4 py-8 bg-black">Show not found</div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player */}
        <div className="lg:w-3/4">
          <div className="relative aspect-video bg-black">
            <img
              src={
                currentEpisode.thumbnailUrl ||
                '/placeholder.svg?height=720&width=1280'
              }
              alt={currentEpisode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/20 backdrop-blur-sm rounded-full p-4">
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">
                    Masuk dan diskusi komentar layar
                  </div>
                </div>
                <button className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Kirim
                </button>
              </div>
            </div>
          </div>

          {/* Show Info */}
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold">{show.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm bg-gray-800 px-2 py-0.5 rounded">
                    2023
                  </span>
                  <span className="text-sm bg-gray-800 px-2 py-0.5 rounded">
                    Tontonan Dewasa
                  </span>
                  <span className="text-sm bg-gray-800 px-2 py-0.5 rounded">
                    Rilis di EP1
                  </span>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-bold">{currentEpisode.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {currentEpisode.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="text-xs text-gray-400">
                  Hongkong Dramas | Rilis di EP1
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex border-b border-gray-800">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    !showComments
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setShowComments(false)}
                >
                  Direkomendasikan untukmu
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    showComments
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setShowComments(true)}
                >
                  Komentar
                </button>
              </div>

              {showComments ? (
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          English Title
                        </h3>
                        <p className="text-xl text-gray-300">Ini Title</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                        <p className="text-gray-300">Synopsissssssssss</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Producer</h3>
                        <p className="text-gray-300">
                          Producerrrrrrrrrrrrrrrrrrrrrrrrs Name
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Studios</h3>
                        <p className="text-gray-300">This is Studios</p>
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
              ) : (
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedShows.map((relatedShow) => (
                    <Link
                      key={relatedShow.id}
                      to={`/details/${relatedShow.id}`}
                      className="group"
                    >
                      <div className="bg-gray-900 rounded-md overflow-hidden">
                        <div className="relative aspect-video">
                          <img
                            src={
                              relatedShow.backdropUrl ||
                              '/placeholder.svg?height=720&width=1280'
                            }
                            alt={relatedShow.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-3">
                            {relatedShow.isVip && (
                              <div className="bg-yellow-500 text-black text-xs font-bold px-1 py-0.5 rounded inline-block mb-2">
                                VIP
                              </div>
                            )}
                            <h3 className="text-sm font-bold">
                              {relatedShow.title}
                            </h3>
                            <p className="text-xs text-gray-300 mt-1">
                              Total: {Math.floor(Math.random() * 20) + 10} EP
                            </p>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {relatedShow.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Episode List */}
        <div className="lg:w-1/4 bg-gray-900">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-bold">Video terpopuler hari ini</h2>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
            {episodes.map((episode, index) => (
              <div
                key={episode.id}
                className={`p-3 border-b border-gray-800 flex gap-3 cursor-pointer ${
                  currentEpisode.id === episode.id ? 'bg-gray-800' : ''
                }`}
                onClick={() => setCurrentEpisode(episode)}
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
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">
                      {Math.floor(Math.random() * 1000) + 100}K views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchPage;
