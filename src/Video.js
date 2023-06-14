import ReactPlayer from 'react-player/lazy';
import { useState, useRef, useEffect } from 'react';
import './index.css';

const VideoPlayer = ({ title, vodPlaylistId }) => {
  const [playIndex, setPlayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef();

  const playList = [

    { index: 1, url: process.env.PUBLIC_URL + '/videos/louvre-museum.mp4', startTime: 1, endTime: 5 }
  ];

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
      <h2>Player Test</h2>
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
