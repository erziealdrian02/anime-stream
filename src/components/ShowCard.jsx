import { Link } from 'react-router-dom';

function ShowCard({ show, showTitle = false, showRating = false }) {
  return (
    <Link to={`/details/${show.id}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-md">
        <img
          src={show.posterUrl || '/placeholder.svg?height=450&width=300'}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {show.isVip && (
          <div className="absolute top-1 right-1 bg-yellow-500 text-xs font-bold px-1 py-0.5 rounded">
            VIP
          </div>
        )}
        {show.isNew && (
          <div className="absolute top-1 left-1 bg-red-500 text-xs font-bold px-1 py-0.5 rounded">
            NEW
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <div className="text-xs font-medium line-clamp-2">{show.title}</div>
          {showRating && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs ml-1">{show.rating}</span>
            </div>
          )}
        </div>
      </div>
      {showTitle && (
        <div className="mt-1">
          <h3 className="text-sm font-medium line-clamp-1">{show.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {show.type === 'drama' ? 'Fantasy Melodrama' : 'Variety Show'}
          </p>
        </div>
      )}
    </Link>
  );
}

export default ShowCard;
