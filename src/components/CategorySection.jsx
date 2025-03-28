import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Korean Dramas',
    slug: 'korean-dramas',
    image: '/placeholder.svg?height=300&width=600',
  },
  {
    name: 'Chinese Dramas',
    slug: 'chinese-dramas',
    image: '/placeholder.svg?height=300&width=600',
  },
  {
    name: 'Variety Shows',
    slug: 'variety-shows',
    image: '/placeholder.svg?height=300&width=600',
  },
  {
    name: 'Anime',
    slug: 'anime',
    image: '/placeholder.svg?height=300&width=600',
  },
  {
    name: 'Thai Dramas',
    slug: 'thai-dramas',
    image: '/placeholder.svg?height=300&width=600',
  },
  {
    name: 'Movies',
    slug: 'movies',
    image: '/placeholder.svg?height=300&width=600',
  },
];

function CategorySection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="group relative overflow-hidden rounded-md aspect-video"
          >
            <img
              src={category.image || '/placeholder.svg'}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-bold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
