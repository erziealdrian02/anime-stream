import { Link } from 'react-router-dom';

function ShowCard({ show, showTitle = false }) {
  return (
    <Link to={`/details/${show.id}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-md">
        <img
          src={show.posterUrl || '/placeholder.svg?height=450&width=300'}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {show.isVip && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-xs font-bold px-2 py-1 rounded">
            VIP
          </div>
        )}
        {show.isNew && (
          <div className="absolute top-2 right-2 bg-primary text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="font-semibold line-clamp-2">{show.title}</h3>
        </div>
      </div>
      {showTitle && (
        <h3 className="mt-2 font-medium line-clamp-2">{show.title}</h3>
      )}
    </Link>
  );
}

export default ShowCard;
