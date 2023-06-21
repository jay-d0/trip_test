import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatDoInput from "./ChatDoInput";

import '../../css/ChatScreen.css';

const ChatDo = ({ character, onTextChange, setDo }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTextChange = (text) => {
    onTextChange(text); // Call the onTextChange prop
  };

  const videoDoQuestions = [];

  if (questionIndex === videoDoQuestions.length) {
    onTextChange("");
  }

  const handleNext = () => {
    console.log("Next button clicked");
    navigate(`/${encodeURIComponent(character)}/options/do`);
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
      {questionIndex < videoDoQuestions.length && (
        <div className="question">
          <p>{videoDoQuestions[questionIndex]}</p>
          <ChatDoInput onSendMessage={handleSendMessage} onTextChange={handleTextChange} setDo={setDo}/>
        </div>
      )}

      {/* 다음 버튼 */}
      {questionIndex === videoDoQuestions.length && (
        <button onClick={handleNext}>다음</button>
      )}
    </div>
  );
};

export default ChatDo;
