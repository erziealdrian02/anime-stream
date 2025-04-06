import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src, title, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Reset video when src changes
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className="w-full h-full relative bg-black">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        poster={poster}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
