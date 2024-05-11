import React, { useState, useEffect } from 'react';
import { IVideoProps } from '../interfaces/VideoInterface';

const VideoPlayer: React.FC<IVideoProps> = ({ videoKey }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoWidth = windowWidth < 768 ? '350px' : '560px';
  const videoHeight = windowWidth < 768 ? '250px' : '315px';

  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoKey}`;

  return (
    <iframe
      title="Video Player"
      width={videoWidth}
      height={videoHeight}
      src={videoUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
