'use client';

// AnimeListSkeleton.jsx
export default function OngoingPageSkeletonLoader() {
  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="bg-black/90 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 text-sm overflow-x-auto py-3">
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="relative h-[50vh] bg-gray-800 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-gray-700 rounded-md"></div>
                <div className="h-3 w-3/4 bg-gray-700 mt-2 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-gray-700 rounded-md"></div>
                <div className="h-3 w-3/4 bg-gray-700 mt-2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
