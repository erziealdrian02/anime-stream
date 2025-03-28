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
import { getShowDetails, getEpisodes, getRelatedShows } from '../lib/api';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleWatchNow = () => {
    navigate(`/watch/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!show) {
    return <div className="container mx-auto px-4 py-8">Show not found</div>;
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
                {show.genres.map((genre) => (
                  <Badge key={genre} variant="outline">
                    {genre}
                  </Badge>
                ))}
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
            <TabsTrigger value="related">More Like This</TabsTrigger>
          </TabsList>
          <TabsContent value="episodes" className="mt-4">
            <EpisodeList
              episodes={episodes}
              onSelectEpisode={(episode) =>
                navigate(`/watch/${id}?ep=${episode.id}`)
              }
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
                <p className="text-gray-300">{show.cast.join(', ')}</p>
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
              </div>
            </div>
          </TabsContent>
          <TabsContent value="related" className="mt-4">
            <RelatedVideos shows={relatedShows} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DetailsPage;
