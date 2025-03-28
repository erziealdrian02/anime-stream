'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import RelatedVideos from '../components/RelatedVideos';
import EpisodeList from '../components/EpisodeList';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { getShowDetails, getEpisodes, getRelatedShows } from '../lib/api';

function WatchPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!show || !currentEpisode) {
    return <div className="container mx-auto px-4 py-8">Show not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <VideoPlayer episode={currentEpisode} />

      <div className="mt-6">
        <h1 className="text-2xl font-bold">{show.title}</h1>
        <p className="text-gray-400 mt-2">{currentEpisode.title}</p>
      </div>

      <Tabs defaultValue="episodes" className="mt-8">
        <TabsList>
          <TabsTrigger value="episodes">Episodes</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
        </TabsList>
        <TabsContent value="episodes" className="mt-4">
          <EpisodeList
            episodes={episodes}
            currentEpisodeId={currentEpisode.id}
            onSelectEpisode={(episode) => setCurrentEpisode(episode)}
          />
        </TabsContent>
        <TabsContent value="details" className="mt-4">
          <div className="space-y-4">
            <p>{show.description}</p>
            <div>
              <h3 className="font-semibold">Cast</h3>
              <p className="text-gray-400">{show.cast.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Genre</h3>
              <p className="text-gray-400">{show.genres.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Release Year</h3>
              <p className="text-gray-400">{show.releaseYear}</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="related" className="mt-4">
          <RelatedVideos shows={relatedShows} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default WatchPage;
