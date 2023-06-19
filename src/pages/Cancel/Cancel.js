import ReactPlayer from 'react-player';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatCancel from "./ChatCancel";

import '../../index.css';

const Cancel = () => {
  const [playIndex, setPlayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef();
  const location = useLocation();
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [guideText, setGuideText] = useState("");

  const handleTextChange = (text) => {
    setGuideText(text);
    if (text !== "") {
      setIsPlaying(false);
      setShowChatScreen(true);
    }
  };

  const playList = [
    { option: 'driving', url: '/videos/driving.mp4', startTime: 1, endTime: 14 },
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
      setIsPlaying(false);
      setShowChatScreen(true);
    }
  };

  if (playList === null) return <p>Loading...</p>;

  return (
    <div className="video-chat-container">
      <div className="video-player-container">
        <ReactPlayer
          ref={playerRef}
          url={process.env.PUBLIC_URL + playList[playIndex].url}
          playing={isPlaying}
          controls={false}
          muted
          progressInterval={1000}
          onProgress={handleProgress}
          pip={true}
          width={'100%'}
          height={'100%'}
          onStart={() => playerRef.current.seekTo(playList[playIndex].startTime, 'seconds')}
          onEnded={() => setIsPlaying(false)} // 1번 재생 후 영상 재생 멈춤
        />
      </div>
      {showChatScreen && (
        <div className="chat-screen-overlay">
          <div className="chat-screen-container">
            <p>{guideText}</p>
            <ChatCancel
              character={playList[playIndex].option}
              onTextChange={handleTextChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cancel;
