import React, { useState, useEffect } from "react";
import "../../css/Airport.css";
import ReactPlayer from "react-player";
import ChatAirport from "./ChatAirport";
import { useParams } from "react-router-dom";
import test from "../../icons/test.gif";

import 서우석 from "../../icons/서우석.gif";
import 민성우 from "../../icons/민성우.gif";
import 박유찬 from "../../icons/박유찬.gif";

const Airport = () => {
  const { character } = useParams();
  const [guideText, setGuideText] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [characterVisible, setCharacterVisible] = useState(false);
  const [ChatAiportVisible, setChatAiportVisible] = useState(false);

  const characters = [
    { name: "민성우", img_url: 민성우 },

    { name: "박유찬", img_url: 박유찬 },

    { name: "서우석", img_url: 서우석 },
  ];

  const selectedCharacter = characters.find((char) => char.name === character);

  const handleTextChange = (text) => {
    setGuideText(text);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const toggleClicked = () => {
    setChatAiportVisible(true);
  };

  useEffect(() => {
    if (videoEnded) {
      setCharacterVisible(true);
    }
  }, [videoEnded]);

  return (
    <div className="video-chat-container">
      <div className="home-container">
        <ReactPlayer
          url={"/videos/seoul-paris.mp4" + "#t=11"}
          playing={true}
          controls={false}
          muted={false}
          progressInterval={1000}
          pip={true}
          width={"100%"}
          height={"100%"}
          onEnded={handleVideoEnd}
        />
        {videoEnded && characterVisible && (
          <>
            <div>
              <div className="selectedCharacter">
                <img
                  src={selectedCharacter.img_url}
                  alt={selectedCharacter.name}
                />
              </div>
              <div className="guide_saying">
                <p>{guideText}</p>
                {
                  <ChatAirport
                    character={character}
                    onTextChange={handleTextChange}
                  />
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Airport;
