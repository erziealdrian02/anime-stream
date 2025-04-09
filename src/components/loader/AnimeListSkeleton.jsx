'use client';

// AnimeListSkeleton.jsx
export default function AnimeListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Skeleton for title */}
      <div className="h-9 bg-gray-800 rounded w-48 mb-6"></div>

      {/* Skeleton for alphabet index */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-9 bg-gray-800 rounded w-10"></div>
          ))}
      </div>

      {/* Skeleton for multiple anime groups */}
      {Array(3)
        .fill(0)
        .map((_, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            {/* Group letter header skeleton */}
            <div className="h-8 bg-gray-800 rounded w-16 mb-4"></div>

            {/* Anime cards grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array(15)
                .fill(0)
                .map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="h-14 bg-gray-800 rounded animate-pulse"
                  ></div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
