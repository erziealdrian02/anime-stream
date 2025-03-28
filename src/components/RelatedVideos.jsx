import ShowCard from './ShowCard';

function RelatedVideos({ shows }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">You May Also Like</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} showTitle />
        ))}
      </div>
    </div>
  );
}

export default RelatedVideos;
