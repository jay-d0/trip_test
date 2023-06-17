import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import '../../css/ChatScreen.css';

const ChatScreen = ({ character, onTextChange, questions }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };

    // Send newMessage to the backend

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTextChange = (text) => {
    onTextChange(text); // Call the onTextChange prop
  };

  if (questionIndex === questions.length) {
    onTextChange("");
  }

  const handleNext = () => {
    console.log("Next button clicked");
    navigate(`/${encodeURIComponent(character)}/options`);
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
      {questionIndex < questions.length && (
        <div className="question">
          <p>{questions[questionIndex]}</p>
          <ChatInput onSendMessage={handleSendMessage} onTextChange={handleTextChange} />
        </div>
      )}

      {/* 다음 버튼 */}
      {questionIndex === questions.length && (
        <button onClick={handleNext}>다음</button>
      )}
    </div>
  );
};

export default ChatScreen;
