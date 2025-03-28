'use client';

function EpisodeList({ episodes, currentEpisodeId, onSelectEpisode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Episodes</h3>
        <div className="text-sm text-gray-400">{episodes.length} episodes</div>
      </div>

      <div className="space-y-4">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className={`flex gap-4 p-2 rounded-md cursor-pointer hover:bg-gray-800 ${
              currentEpisodeId === episode.id ? 'bg-gray-800' : ''
            }`}
            onClick={() => onSelectEpisode(episode)}
          >
            <div className="relative w-32 aspect-video flex-shrink-0">
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
            </div>
            <div className="flex-1">
              <h4 className="font-medium line-clamp-1">
                {episode.episodeNumber}. {episode.title}
              </h4>
              <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                {episode.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpisodeList;
