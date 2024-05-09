import React from 'react';

interface IVideoProps {
  videoKey: string;
}


const VideoPlayer: React.FC<IVideoProps> = ({ videoKey}) => {
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoKey}`;

  return (
    <iframe
      title="Video Player" 

      width="560"
      height="315"
      src={videoUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
