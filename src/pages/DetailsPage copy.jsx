'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import EpisodeList from '../components/EpisodeList';
import RelatedVideos from '../components/RelatedVideos';
import { fetchDetailAnime } from '../lib/api';

// Helper function to extract text from complex description object
const getDescriptionText = (synopsis) => {
  // If it's a string, return it directly
  if (typeof synopsis === 'string') {
    return synopsis;
  }

  // If it's an object with paragraphs property, join them
  if (synopsis && synopsis.paragraphs && Array.isArray(synopsis.paragraphs)) {
    return synopsis.paragraphs.join('\n\n');
  }

  // Fallback
  return 'No description available';
};

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch anime details
        const animeData = await fetchDetailAnime(id);

        if (!animeData) {
          setError('Anime not found');
          return;
        }

        console.log('Raw anime data:', animeData); // Debug log

        // Extract description text properly
        const descriptionText = getDescriptionText(animeData.synopsis);

        // Map API response to component structure
        const showData = {
          title:
            animeData.title ||
            animeData.english ||
            animeData.japanese ||
            'Unknown Title',
          posterUrl: animeData.poster || null,
          backdropUrl: animeData.backdrop || animeData.poster || null,
          description: descriptionText,
          genres: animeData.genreList?.map((genre) => genre.title) || [],
          cast: animeData.producers?.split(', ') || [
            'Information not available',
          ],
          director: animeData.studios || 'Information not available',
          releaseYear:
            animeData.aired?.split(' to ')[0]?.slice(-4) || 'Unknown',
          rating: animeData.score?.value || 'N/A',
          duration: animeData.duration || 'Unknown',
          country: 'Japan', // Assuming for anime
          status: animeData.status || 'Unknown',
        };

        setShow(showData);

        // Process episodes from the animeData
        if (animeData.episodeList && Array.isArray(animeData.episodeList)) {
          const sortedEpisodes = animeData.episodeList
            .map((ep) => ({
              id: ep.id,
              number: ep.number || '',
              title: ep.title || `Episode ${ep.number || ''}`,
              thumbnail: ep.thumbnail || animeData.poster,
              url: ep.url || `/watch/${id}?ep=${ep.number || ''}`,
              releaseDate: ep.releaseDate || '',
              samehadakuUrl: ep.samehadakuUrl || '',
              isRecommended: ep.isRecommended || false,
            }))
            .sort((a, b) => parseInt(b.number) - parseInt(a.number));

          setEpisodes(sortedEpisodes);
        }

        // For related shows, we'll use an empty array since we're removing the function
        setRelatedShows([]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load anime details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log('Kiw kiw Episodesssss', episodes);

  const handleWatchNow = () => {
    // If there are episodes, navigate to the first one
    if (episodes.length > 0) {
      navigate(`/watch/${id}?ep=${episodes[0].id}`);
    } else {
      navigate(`/watch/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || 'Show not found'}</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[50vh] w-full">
        <img
          src={show.backdropUrl || '/placeholder.svg?height=600&width=1200'}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
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
                {Array.isArray(show.genres) ? (
                  show.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {genre}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline">Genre information unavailable</Badge>
                )}
              </div>
              <p className="text-gray-300 max-w-2xl line-clamp-3">
                {show.description}
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
        <Tabs defaultValue="episodes" className="mt-8">
          <TabsList>
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            {/* <TabsTrigger value="related">More Like This</TabsTrigger> */}
          </TabsList>
          <TabsContent value="episodes" className="mt-4">
            <EpisodeList
              episodes={episodes}
              onSelectEpisode={(episode) => navigate(`/watch/${episode.id}`)}
            />
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                <p className="text-gray-300">{show.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cast</h3>
                <p className="text-gray-300">
                  {Array.isArray(show.cast) ? show.cast.join(', ') : show.cast}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{show.director}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Release Year</h3>
                  <p className="text-gray-300">{show.releaseYear}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Rating</h3>
                  <p className="text-gray-300">{show.rating}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-gray-300">{show.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Country</h3>
                  <p className="text-gray-300">{show.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-gray-300">{show.status}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          {/* <TabsContent value="related" className="mt-4">
            <RelatedVideos shows={relatedShows} />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}

export default DetailsPage;
