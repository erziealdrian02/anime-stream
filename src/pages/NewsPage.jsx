'use client';

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAnimeNews, getNewsDetail } from '../lib/api';

function NewsPage() {
  const [searchParams] = useSearchParams();
  const newsId = searchParams.get('id');

  const [newsList, setNewsList] = useState([]);
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'updates', 'releases', 'events', 'interviews'];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        if (newsId) {
          // Fetch specific news article
          const detail = await getNewsDetail(newsId);
          setNewsDetail(detail);
        } else {
          // Fetch news list
          const news = await getAnimeNews();
          setNewsList(news);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  // Filter news by category
  const filteredNews =
    activeCategory === 'all'
      ? newsList
      : newsList.filter((news) => news.category === activeCategory);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Secondary Navigation */}
      <div className="bg-black/90 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 text-sm overflow-x-auto py-3">
            <Link
              to="/"
              className="text-gray-400 hover:text-white whitespace-nowrap"
            >
              Untukmu
            </Link>
            <Link to="/news" className="text-white whitespace-nowrap">
              Berita Anime
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : newsDetail ? (
          // News Detail View
          <div className="max-w-4xl mx-auto">
            <Link
              to="/news"
              className="inline-flex items-center text-primary mb-6 hover:underline"
            >
              <svg
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to News
            </Link>

            <h1 className="text-3xl font-bold mb-4">{newsDetail.title}</h1>

            <div className="flex items-center text-sm text-gray-400 mb-6">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded capitalize">
                {newsDetail.category}
              </span>
              <span className="mx-2">•</span>
              <span>{formatDate(newsDetail.date)}</span>
              <span className="mx-2">•</span>
              <span>By {newsDetail.author}</span>
            </div>

            <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
              <img
                src={
                  newsDetail.coverImage ||
                  '/placeholder.svg?height=720&width=1280'
                }
                alt={newsDetail.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none">
              {newsDetail.content.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}

              {newsDetail.images && newsDetail.images.length > 0 && (
                <div className="my-8 grid grid-cols-2 gap-4">
                  {newsDetail.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <img
                        src={image || '/placeholder.svg?height=360&width=640'}
                        alt={`Image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {newsDetail.relatedShows &&
                newsDetail.relatedShows.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Related Anime</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {newsDetail.relatedShows.map((show) => (
                        <Link
                          key={show.id}
                          to={`/details/${show.id}`}
                          className="group"
                        >
                          <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                            <img
                              src={
                                show.posterUrl ||
                                '/placeholder.svg?height=450&width=300'
                              }
                              alt={show.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                              <div className="text-xs font-medium line-clamp-2">
                                {show.title}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        ) : (
          // News List View
          <>
            <h1 className="text-3xl font-bold mb-6">Berita Anime Terbaru</h1>

            {/* Category Filters */}
            <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap
                      ${
                        activeCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'All News' : category}
                </button>
              ))}
            </div>

            {/* Featured News */}
            {activeCategory === 'all' && newsList.length > 0 && (
              <div className="mb-10">
                <Link to={`/news?id=${newsList[0].id}`} className="block group">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={
                        newsList[0].coverImage ||
                        '/placeholder.svg?height=720&width=1280'
                      }
                      alt={newsList[0].title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="bg-primary/20 text-primary px-2 py-0.5 rounded text-sm inline-block capitalize mb-2">
                        {newsList[0].category}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">
                        {newsList[0].title}
                      </h2>
                      <p className="text-gray-300 line-clamp-2 mb-2">
                        {newsList[0].excerpt}
                      </p>
                      <div className="text-sm text-gray-400">
                        {formatDate(newsList[0].date)} • By {newsList[0].author}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* News Grid */}
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews
                  .slice(activeCategory === 'all' ? 1 : 0)
                  .map((news) => (
                    <Link
                      key={news.id}
                      to={`/news?id=${news.id}`}
                      className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={
                            news.coverImage ||
                            '/placeholder.svg?height=360&width=640'
                          }
                          alt={news.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-primary/20 text-primary px-2 py-0.5 rounded text-xs capitalize">
                          {news.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-3 mb-3">
                          {news.excerpt}
                        </p>
                        <div className="text-xs text-gray-500">
                          {formatDate(news.date)} • By {news.author}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                No news articles found in this category
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
