import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ src, title, poster }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const handleError = (e) => {
      // console.error('Video Error:', video.error);
      setError(`Gagal memutar video: ${getVideoError(video.error)}`);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      // console.log('Video loading started');
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      // console.log('Video can play');
      setIsLoading(false);
      video.play().catch((e) => {
        // console.warn('Autoplay prevented:', e);
        setError('Klik tombol play untuk memulai video');
      });
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);

    // Cek jika URL adalah encoded
    if (src.includes('index.php?id=')) {
      // Gunakan iframe sebagai fallback untuk URL khusus
      return;
    }

    video.src = src;
    video.load();

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.src = '';
    };
  }, [src]);

  const getVideoError = (error) => {
    if (!error) return 'Unknown error';
    switch (error.code) {
      case 1:
        return 'Video dihentikan';
      case 2:
        return 'Jaringan error';
      case 3:
        return 'Error decoding video';
      case 4:
        return 'Format tidak didukung';
      default:
        return error.message || 'Error tidak diketahui';
    }
  };

  // Fallback ke iframe untuk URL khusus
  if (src.includes('index.php?id=')) {
    return (
      <div className="w-full h-full relative bg-black">
        <iframe
          src={src}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
          title={title}
        />
        {/* {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )} */}
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-black">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        playsInline
        muted
        poster={poster}
        preload="auto"
        crossOrigin="anonymous"
      >
        Your browser does not support the video tag.
      </video>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                videoRef.current?.load();
              }}
              className="bg-primary px-4 py-2 rounded hover:bg-primary/80 transition"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
