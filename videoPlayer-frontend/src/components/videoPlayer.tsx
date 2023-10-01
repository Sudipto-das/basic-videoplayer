import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  console.log(videoUrl)
  return (
    <div>
      <h2>Video Player</h2>
      <ReactPlayer url={videoUrl} controls width="100%" height="auto" />
    </div>
  );
}

export default VideoPlayer;
