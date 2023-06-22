import ReactPlayer from 'react-player';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ChatEat from "../Chat/ChatEat";
import ChatStay from "../Chat/ChatStay";
import ChatDo from '../Chat/ChatDo';

import '../../css/VideoPlayer.css';

const VideoPlayer = ({ setEat, setStay, setDo, playList }) => {
  const [playIndex, setPlayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef();
  const location = useLocation();
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [guideText, setGuideText] = useState(""); // 입력된 텍스트 저장
  const [chatComponent, setChatComponent] = useState(null);
  const [Type, setType] = useState({});

  
  const handleTextChange = (text) => {
    setGuideText(text);
    if (text !== "") {
      setIsPlaying(false);
      determineNextScreen(text);
      setShowChatScreen(true);
    }
  };

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
      playerRef.current.seekTo(currentVideo.startTime, 'seconds');
      determineNextScreen("");
      setShowChatScreen(true);
    }
  };

  const determineNextScreen = (text) => {
    if (text.trim() !== "") {
      const category = zeroShotClassification(text);
      if (category === "food") {
        setShowChatScreen(true);
        setGuideText("");
        setChatComponent(<ChatEat character={playList[playIndex].option} onTextChange={handleTextChange} setEat={setEat}/>);
      } else if (category === "hotel") {
        setShowChatScreen(true);
        setGuideText("");
        setChatComponent(<ChatStay character={playList[playIndex].option} onTextChange={handleTextChange} setStay={setStay}/>);
      } else if (category === "attraction") {
        setShowChatScreen(true);
        setGuideText("");
        setChatComponent(<ChatDo character={playList[playIndex].option} onTextChange={handleTextChange} setDo={setDo} />);
      } else {
        // 기본적으로 ChatStay 컴포넌트로 이동
        setShowChatScreen(true);
        setGuideText("");
        setChatComponent(<ChatStay character={playList[playIndex].option} onTextChange={handleTextChange} setStay={setStay}/>);
      }
    }
  };

  const zeroShotClassification = (text) => {
    // 관광지, 음식, 호텔 분류 모델 리턴
    // food, hotel, attraction 중 하나 받아옴
    /* communicate.post('/type',
    { A
    }).then((res) => {
    setType(res.data);
    })*/
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
          muted={true}
          progressInterval={1000}
          onProgress={handleProgress}
          pip={true}
          width={'100%'}
          height={'100%'}
          onStart={() => playerRef.current.seekTo(playList[playIndex].startTime, 'seconds')}
        />
      </div>
      {showChatScreen && (
        <div className="chat-screen-overlay">
          <div className="chat-screen-container">
            {guideText === "" && <p>다음으로 무엇을 할까요?</p>}
            <p>{guideText}</p>
            {/* ChatDo, ChatStay, ChatEat 중 결정된 컴포넌트로 연결 */}
            {chatComponent} 
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
