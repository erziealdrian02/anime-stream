'use client';

import React from 'react';

function CompleteSkeletonLoader() {
  // Buat array dengan 8 item untuk skeleton card
  const skeletonItems = Array(8).fill(null);

  return (
    <section>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-200 h-6 w-32 rounded animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
        </div>

        <div className="relative w-full">
          {/* Main container with horizontal scroll */}
          <div
            className="flex space-x-3 w-full pb-5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Skeleton Cards */}
            {skeletonItems.map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[190px] md:w-[250px]">
                {/* Poster Skeleton */}
                <div className="bg-gray-200 h-64 md:h-80 rounded-lg animate-pulse mb-2"></div>
                {/* Title Skeleton */}
                <div className="bg-gray-200 h-4 w-full rounded animate-pulse mb-1"></div>
                {/* Info Skeleton */}
                <div className="bg-gray-200 h-3 w-2/3 rounded animate-pulse mb-1"></div>
                {/* Tags/Genres Skeleton */}
                <div className="flex gap-1 mt-2">
                  <div className="bg-gray-200 h-3 w-12 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-3 w-10 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Skeleton untuk tombol scroll */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full z-10 hidden md:block">
            <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full z-10 hidden md:block">
            <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompleteSkeletonLoader;
