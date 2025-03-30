'use client';

import React from 'react';

function CategorySkeletonLoader() {
  // Buat array dengan 8 item untuk skeleton card kategori
  const skeletonItems = Array(8).fill(null);

  return (
    <section>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-200 h-6 w-48 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md aspect-video bg-gray-200 animate-pulse"
            >
              <div className="absolute inset-0 bg-black/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-100/30 h-5 w-24 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton untuk tombol Show All */}
        <div className="mt-4 w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </section>
  );
}

export default CategorySkeletonLoader;
