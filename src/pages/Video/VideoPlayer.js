import ReactPlayer from "react-player";
import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChatEat from "../Chat/ChatEat";
import ChatStay from "../Chat/ChatStay";
import ChatDo from "../Chat/ChatDo";
import communicate from "../../communicate";
import { useNavigate } from "react-router-dom";

import "../../css/VideoPlayer.css";

const VideoPlayer = ({ setEat, setStay, setDo, playList, co }) => {
  const { character, _ } = useParams();
  const [playIndex, setPlayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef();
  const location = useLocation();
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [guideText, setGuideText] = useState(""); // 입력된 텍스트 저장
  const [chatComponent, setChatComponent] = useState(null);
  const [Type, setType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 앞 턴의 영상 재생 //

  useEffect(() => {
    const option = location.pathname.split("/").pop();
    const optionIndex = playList.findIndex((video) => {
      return video.option === option;
    });
    if (optionIndex !== -1) {
      setPlayIndex(optionIndex);
    }
  }, [location.pathname]);

  // 영상 pause //

  const handleProgress = (progress) => {
    const currentVideo = playList[playIndex];
    if (progress.playedSeconds >= currentVideo.endTime) {
      setIsPlaying(false);
      playerRef.current.seekTo(currentVideo.startTime, "seconds");
      setShowChatScreen(true);
      setGuideText("");
    }
  };

  // 인풋에 따른 determineNextScreen //

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    determineNextScreen(message);
  };

  const determineNextScreen = (text) => {
    if (text.trim() !== "") {
      zeroShotClassification(text);
    }
  };

  useEffect(() => {
    if ((Type === "cafe") | (Type === "alcohol") | (Type === "meal")) {
      setChatComponent(
        <ChatEat
          character={character}
          onTextChange={setGuideText}
          setEat={setEat}
          category={Type}
        />
      );
    } else if (Type === "hotel") {
      setChatComponent(
        <ChatStay
          character={character}
          onTextChange={setGuideText}
          setStay={setStay}
        />
      );
    } else if (Type === "attraction") {
      setChatComponent(<ChatDo character={character} setDo={setDo} co={co} />);
    }
  }, [Type]);

  const zeroShotClassification = (text) => {
    communicate.post("/what", { A: text }).then((res) => {
      setType(res.data.what);
      setShowChatScreen(false);
    });
    // 관광지, 음식, 호텔 분류 모델 리턴
    // food, hotel, attraction 중 하나 받아옴
  };

  const handleEnd = () => {
    console.log("Next button clicked");
    navigate(`/end`);
  };

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
          width={"100%"}
          height={"100%"}
          onStart={() =>
            playerRef.current.seekTo(playList[playIndex].startTime, "seconds")
          }
        />
      </div>
      {showChatScreen && (
        <div className="chat-screen-container">
          {guideText === "" && <p>다음으로 무엇을 할까요?</p>}
          <p>{guideText}</p>
          {/* 인풋 */}
          <form onSubmit={handleInputSubmit}>
            <input
              type="text"
              placeholder="입력하세요..."
              value={message}
              onChange={handleInputChange}
            />
            <button type="submit">다음</button>
          </form>
          <button className="end-button" onClick={handleEnd}>
            가이드 종료하기
          </button>
        </div>
      )}

      {/* ChatDo, ChatStay, ChatEat 중 결정된 컴포넌트로 연결 */}
      {!showChatScreen && chatComponent && (
        <div className="chat-component"> {chatComponent} </div>
      )}
    </div>
  );
};

export default VideoPlayer;
