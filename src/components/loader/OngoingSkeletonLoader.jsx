'use client';

import React from 'react';

function OngoingSkeletonLoader() {
  // Create an array of 8 items for the skeleton cards
  const skeletonItems = Array(8).fill(null);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">On Going</h2>
          <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
        </div>

        {/* Main container with horizontal scroll */}
        <div className="relative">
          <div className="overflow-x-scroll flex gap-4 pb-4 hide-scrollbar">
            {skeletonItems.map((_, index) => (
              <div key={index} className="flex-shrink-0 w-36 md:w-44">
                {/* Skeleton Card */}
                <div className="bg-gray-200 h-52 md:h-64 rounded-lg animate-pulse mb-2"></div>
                <div className="bg-gray-200 h-4 w-full rounded animate-pulse mb-1"></div>
                <div className="bg-gray-200 h-3 w-2/3 rounded animate-pulse mb-1"></div>
                <div className="flex gap-1 mt-2">
                  <div className="bg-gray-200 h-3 w-12 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-3 w-10 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Optional scroll buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hidden md:block"
            onClick={() => {
              document
                .querySelector('.overflow-x-scroll')
                .scrollBy({ left: -300, behavior: 'smooth' });
            }}
          >
            <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hidden md:block"
            onClick={() => {
              document
                .querySelector('.overflow-x-scroll')
                .scrollBy({ left: 300, behavior: 'smooth' });
            }}
          >
            <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default OngoingSkeletonLoader;
