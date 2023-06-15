import ReactPlayer from 'react-player/lazy';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './index.css';

const VideoPlayer = () => {
  const [playIndex, setPlayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef();
  const location = useLocation();

  const playList = [
    { option: 'louvre-museum', url: process.env.PUBLIC_URL + '/videos/louvre-museum.mp4', startTime: 1, endTime: 5 },
    { option: 'arc-de-triomphe', url: process.env.PUBLIC_URL + '/videos/arc-de-triomphe.mp4', startTime: 1, endTime: 5 },
    { option: 'centre-pompidu', url: process.env.PUBLIC_URL + '/videos/centre-pompidu.mp4', startTime: 1, endTime: 5 },
    // Add more options here...
  ];

  useEffect(() => {
    const option = location.pathname.split('/').pop();
    const optionIndex = playList.findIndex((video) => video.option === option);
    if (optionIndex !== -1) {
      setPlayIndex(optionIndex);
    }
  }, [location.pathname, playList]);

  const handleProgress = (progress) => {
    const currentVideo = playList[playIndex];
    if (progress.playedSeconds >= currentVideo.endTime) {
      const nextVideoIndex = playIndex + 1;
      if (nextVideoIndex < playList.length) {
        const nextVideo = playList[nextVideoIndex];
        playerRef.current.seekTo(nextVideo.startTime, 'seconds');
        setPlayIndex(nextVideoIndex);
      } else {
        setIsPlaying(false);
      }
    }
  };

  if (playList === null) return <p>Loading...</p>;

  return (
    <>
      <div className="video-player-container">
        <ReactPlayer
          ref={playerRef}
          url={playList[playIndex].url}
          playing={isPlaying}
          controls={false}
          muted
          progressInterval={1000}
          onProgress={handleProgress}
          pip={true}
          width={'100%'}
          height={'100%'}
          onStart={() => playerRef.current.seekTo(playList[playIndex].startTime, 'seconds')}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
