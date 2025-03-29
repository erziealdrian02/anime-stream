import { Link } from 'react-router-dom';

function ShowBigCard({ show }) {
  return (
    <Link key={show.id} to={`/details/${show.id}`} className="group">
      <div className="bg-gray-900 rounded-md overflow-hidden">
        <div className="relative aspect-[2/3]">
          <img
            src={show.posterUrl || '/placeholder.svg?height=720&width=1280'}
            alt={show.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <div className="bg-black text-white text-sm font-bold px-1 py-0.5 rounded inline-block">
              ⭐ {show.score}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3">
            <h3 className="text-sm font-bold">{show.title}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {show.genres.map((genres, index) => (
                <Link
                  key={index}
                  to={`/category/${genres.genreId}`} // Sesuaikan dengan route genre di aplikasi
                  className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full hover:bg-gray-600 transition"
                >
                  {genres.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ShowBigCard;
