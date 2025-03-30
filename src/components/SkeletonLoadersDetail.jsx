import React from 'react';

// Component for the episode card skeleton
const EpisodeCardSkeleton = () => (
  <div className="flex gap-4 p-4 rounded-md bg-gray-900 animate-pulse">
    {/* Thumbnail skeleton */}
    <div className="relative w-40 aspect-video flex-shrink-0 bg-gray-800 rounded-md"></div>
    <div className="flex-1">
      {/* Title skeleton */}
      <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
      {/* Description skeleton - two lines */}
      <div className="h-3 bg-gray-800 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-800 rounded w-4/5 mb-2"></div>
      {/* Date skeleton */}
      <div className="h-3 bg-gray-800 rounded w-1/4 mt-2"></div>
    </div>
  </div>
);

// Component for expanded episode skeleton with recommendations
const ExpandedEpisodeSkeleton = () => (
  <div className="bg-gray-800/50 p-4 animate-pulse">
    <div className="flex gap-4 mb-4">
      {/* Thumbnail skeleton */}
      <div className="relative w-32 aspect-video flex-shrink-0 bg-gray-700 rounded-md"></div>
      <div className="flex-1">
        {/* Description lines */}
        <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-700 rounded w-4/5 mb-2"></div>
        {/* Date */}
        <div className="h-3 bg-gray-700 rounded w-1/4 mt-2"></div>
        {/* Button */}
        <div className="mt-3 h-7 bg-gray-700 rounded w-20"></div>
      </div>
    </div>

    {/* Recommendations section */}
    <div className="mt-4 border-t border-gray-700 pt-4">
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Generate 4 recommendation skeletons */}
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex gap-2 p-2 bg-gray-700 rounded-md">
            <div className="relative w-16 h-12 flex-shrink-0 bg-gray-600 rounded"></div>
            <div className="flex-1">
              <div className="h-3 bg-gray-600 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main skeleton loader for the entire details page
const AnimeDetailsSkeletonLoader = () => {
  return (
    <div className="bg-black min-h-screen pt-16">
      {/* Hero Banner Skeleton */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 w-full h-full bg-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="container mx-auto flex flex-col md:flex-row gap-8 items-end animate-pulse">
            {/* Poster skeleton */}
            <div className="relative h-48 w-32 md:h-64 md:w-44 flex-shrink-0 bg-gray-800 rounded-md"></div>
            <div className="flex-1 space-y-4">
              {/* Title skeleton */}
              <div className="h-8 bg-gray-800 rounded w-2/3"></div>

              {/* Genres skeleton */}
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-6 bg-gray-800 rounded-full w-16"
                  ></div>
                ))}
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              </div>

              {/* Buttons skeleton */}
              <div className="flex flex-wrap gap-4">
                <div className="h-10 bg-gray-800 rounded w-32"></div>
                <div className="h-10 bg-gray-800 rounded w-32"></div>
                <div className="h-10 bg-gray-800 rounded-full w-10"></div>
                <div className="h-10 bg-gray-800 rounded-full w-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs Skeleton */}
        <div className="border-b border-gray-800 mb-6">
          <div className="flex space-x-6 animate-pulse">
            <div className="h-6 bg-gray-800 rounded w-20 mb-3"></div>
            <div className="h-6 bg-gray-800 rounded w-20 mb-3"></div>
            <div className="h-6 bg-gray-800 rounded w-20 mb-3"></div>
          </div>
        </div>

        {/* Tab Content Skeleton */}
        <div className="mt-6 animate-pulse">
          <div className="space-y-4">
            {/* Generate 5 episode skeletons */}
            {[...Array(5)].map((_, idx) => (
              <EpisodeCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for episode recommendations section
const RecommendationsSkeletonLoader = () => (
  <div className="text-center py-4">
    <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
    <p className="text-xs text-gray-400 mt-2">Loading recommendations...</p>
  </div>
);

export {
  AnimeDetailsSkeletonLoader,
  EpisodeCardSkeleton,
  ExpandedEpisodeSkeleton,
  RecommendationsSkeletonLoader,
};
