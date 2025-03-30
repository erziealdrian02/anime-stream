'use client';

function EpisodeList({ episode }) {
  return (
    <div
      key={episode.episodeId || index}
      className="flex gap-4 p-4 rounded-md bg-gray-900 hover:bg-gray-800 cursor-pointer"
      onClick={() => navigate(`/watch/${id}?ep=${episode.episodeId}`)}
    >
      <div className="relative w-40 aspect-video flex-shrink-0">
        <img
          src={episode.thumbnailUrl || '/placeholder.svg?height=180&width=320'}
          alt={renderContent(episode.title)}
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          {episode.duration || '24 min'}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">
          {episode.episodeNumber || index + 1}. {renderContent(episode.title)}
        </h4>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
          {renderContent(episode.description)}
        </p>
        <div className="mt-2 text-xs text-gray-500">
          {episode.releaseDate || 'Unknown release date'}
        </div>
      </div>
    </div>
  );
}

export default EpisodeList;
