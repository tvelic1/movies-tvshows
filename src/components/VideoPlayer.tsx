import React from 'react';

interface VideoProps {
  videoKey: string;
}

const VideoPlayer: React.FC<VideoProps> = ({ videoKey }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoKey}`;

  return (
    <iframe
      width="560"
      height="315"
      src={videoUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
