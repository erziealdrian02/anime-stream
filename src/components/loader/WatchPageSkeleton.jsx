import React from 'react';

function WatchPageSkeleton() {
  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player Skeleton */}
        <div className="w-full">
          <div className="relative aspect-video bg-gray-800 animate-pulse"></div>

          {/* Quality and Server selection Skeleton */}
          <div className="bg-gray-900 p-3 rounded-md mt-2">
            <div className="flex flex-wrap gap-2 mb-2">
              <div className="w-16 h-6 bg-gray-800 animate-pulse rounded"></div>
              <div className="w-12 h-6 bg-gray-800 animate-pulse rounded"></div>
              <div className="w-12 h-6 bg-gray-800 animate-pulse rounded"></div>
              <div className="w-12 h-6 bg-gray-800 animate-pulse rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="w-16 h-6 bg-gray-800 animate-pulse rounded"></div>
              <div className="w-20 h-6 bg-gray-800 animate-pulse rounded"></div>
              <div className="w-24 h-6 bg-gray-800 animate-pulse rounded"></div>
            </div>
          </div>

          {/* Show Info Skeleton */}
          <div className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                {/* Title */}
                <div className="w-3/4 h-7 bg-gray-800 animate-pulse rounded"></div>

                {/* Genres */}
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-5 bg-gray-800 animate-pulse rounded"
                    ></div>
                  ))}
                </div>

                {/* Synopsis */}
                <div className="mt-4">
                  <div className="w-32 h-6 bg-gray-800 animate-pulse rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                    <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                    <div className="w-full h-4 bg-gray-800 animate-pulse rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-800 animate-pulse rounded"></div>
                  </div>
                  <div className="w-24 h-5 bg-gray-800 animate-pulse rounded mt-2"></div>
                </div>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="mt-6">
              <div className="flex border-b border-gray-800">
                <div className="w-24 h-8 bg-gray-800 animate-pulse rounded mr-2"></div>
                <div className="w-56 h-8 bg-gray-800 animate-pulse rounded mr-2"></div>
                <div className="w-20 h-8 bg-gray-800 animate-pulse rounded"></div>
              </div>

              {/* Download section skeleton */}
              <div className="py-4">
                {[1, 2, 3].map((serverIndex) => (
                  <div key={serverIndex} className="mb-6">
                    <div className="w-32 h-6 bg-gray-800 animate-pulse rounded mb-3"></div>
                    <div className="space-y-3">
                      {[1, 2].map((qualityIndex) => (
                        <div
                          key={qualityIndex}
                          className="bg-gray-900 p-3 rounded-md"
                        >
                          <div className="w-20 h-5 bg-gray-800 animate-pulse rounded mb-2"></div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {[1, 2, 3, 4, 5].map((urlIndex) => (
                              <div
                                key={urlIndex}
                                className="h-8 bg-gray-800 animate-pulse rounded"
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchPageSkeleton;
