import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../Chat/ChatMessage";
import ChatCancelInput from "./ChatCancelInput";
import ChatEat from "../Chat/ChatEat";
import ChatStay from "../Chat/ChatStay";
import ChatDo from "../Chat/ChatDo";
import communicate from "../../communicate";

import "../../css/ChatScreen.css";

const ChatCancel = ({
  character,
  setGuideText,
  setEat,
  setStay,
  setDo,
  co,
}) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [showChatScreen, setShowChatScreen] = useState(true);
  const [chatComponent, setChatComponent] = useState(null);
  const [category, setCategory] = useState("");

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const cancelQuestions = [
    [
      "큰일났습니다! 파리가 아니라 니스에 있는 ‘호텔 에펠 켄싱턴’ 지점을 예약하셨네요.",
      "지금 파리 지점은 모두 방이 찼다고 합니다. 어떻게 할까요?",
    ],
  ];

  useEffect(() => {
    if (questionIndex === cancelQuestions.length) {
      setGuideText("");
    }
  }, [questionIndex]);

  const handleNext = () => {
    // const category =
    determineNextScreen(); // 다음 화면 결정
  };

  useEffect(() => {
    if (
      (category === "cafe") |
      (category === "alcohol") |
      (category === "meal")
    ) {
      setChatComponent(
        <ChatEat
          character={character}
          onTextChange={setGuideText}
          setEat={setEat}
          category={category}
        />
      );
      setShowChatScreen(false);
    } else if (category === "hotel") {
      setChatComponent(
        <ChatStay
          character={character}
          onTextChange={setGuideText}
          setStay={setStay}
        />
      );
      setShowChatScreen(false);
    } else if (category === "attraction") {
      setChatComponent(<ChatDo character={character} setDo={setDo} co={co} />);
      setShowChatScreen(false);
    }
  }, [category]);

  const determineNextScreen = () => {
    const text = messages[0].text;

    if (text.trim() !== "") {
      zeroShotClassification(text);
    }
  };

  const zeroShotClassification = (text) => {
    // return hotel;
    communicate.post("/what", { A: text }).then((res) => {
      setCategory(res.data.what);
    });
    // 관광지, 음식, 호텔 분류 모델 리턴
    // food, hotel, attraction 중 하나 받아옴
  };

  return (
    <div>
      {/* Hide the chat screen when showChatScreen is false */}
      {showChatScreen && (
        <div className="chat-screen">
          {/* 메시지 내용 */}
          {/*<div className="messages">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>*/}

          {/* 현재 질문 및 input */}
          {questionIndex < cancelQuestions.length && (
            <div className="question">
              <p>
                {cancelQuestions[questionIndex].map((token) => {
                  return <div>{token}</div>;
                })}
              </p>
              <ChatCancelInput
                onSendMessage={handleSendMessage}
                onTextChange={setGuideText}
              />
            </div>
          )}

          {questionIndex === cancelQuestions.length && (
            <button className="next-button" onClick={handleNext}>
              다음
            </button>
          )}
        </div>
      )}

      {!showChatScreen && chatComponent && (
        <div className="chat-component">{chatComponent}</div>
      )}
    </div>
  );
};

export default ChatCancel;
