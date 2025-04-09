'use client';

// ScheduleSkeleton.jsx
export default function ScheduleSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Skeleton for title */}
      <div className="h-10 bg-gray-800 rounded w-64 mb-6"></div>

      {/* Skeleton for day tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="h-10 bg-gray-800 rounded-full w-32 animate-pulse"
            ></div>
          ))}
      </div>

      {/* Skeleton for day subtitle */}
      <div className="h-8 bg-gray-800 rounded w-48 mb-6"></div>

      {/* Skeleton for anime cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden p-4 animate-pulse"
            >
              <div className="flex">
                {/* Poster placeholder */}
                <div className="w-20 h-28 bg-gray-800 rounded-md"></div>

                <div className="ml-4 flex-1">
                  {/* Title placeholder */}
                  <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>

                  {/* Status and duration row */}
                  <div className="flex items-center mt-1">
                    <div className="h-4 bg-gray-800 rounded w-16"></div>
                    <div className="mx-2 h-4 bg-transparent w-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-12"></div>
                  </div>

                  {/* Synopsis placeholder - two lines */}
                  <div className="mt-3 h-4 bg-gray-800 rounded w-full"></div>
                  <div className="mt-2 h-4 bg-gray-800 rounded w-5/6"></div>

                  {/* Score and genres row */}
                  <div className="mt-3 flex items-center">
                    <div className="h-4 bg-gray-800 rounded w-8 mr-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
