import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatStayInput from "./ChatStayInput";

import "../../css/ChatScreen.css";

const ChatStay = ({ character, onTextChange, setStay }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const videoStayQuestions = ["어떤 호텔로 갈까요?"];

  useEffect(() => {
    if (questionIndex === videoStayQuestions.length) {
      onTextChange("");
    }
  }, [questionIndex]);

  const handleNext = () => {
    console.log("Next button clicked");
    navigate(`/${encodeURIComponent(character)}/options/stay`);
  };

  return (
    <div className="chat-screen">
      {/* 메시지 내용 */}
      {/*<div className="messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        </div>*/}

      {/* 현재 질문 및 input */}
      {questionIndex < videoStayQuestions.length && (
        <div className="question">
          <p>{videoStayQuestions[questionIndex]}</p>
          <ChatStayInput
            onSendMessage={handleSendMessage}
            character={character}
            setStay={setStay}
          />
        </div>
      )}

      {/* 다음 버튼 */}
      {questionIndex === videoStayQuestions.length && (
        <button onClick={handleNext}>다음</button>
      )}
    </div>
  );
};

export default ChatStay;
