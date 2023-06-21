// 보류 //
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import '../../css/ChatScreen.css';

const ChatScreen = ({ character, onTextChange }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const determineCategory = (message) => {
    // 메시지에 따라서 카테고리 결정
    // questionIndex를 증가시키고, 다음 질문으로 이동
  };

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };

    // Send newMessage to the backend

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    determineCategory(message);
  };

  const videoQuestions = [
    {
      category: "eat",
      question: ["어떤 음식점으로 갈까요?", "어떤 메뉴를 먹고 싶으신가요?"]
    },
    {
      category: "stay",
      question: ["어떤 호텔로 갈까요?"]
    },
    {
      category: "do",
      question: []
    }
  ];

  const currentQuestion = videoQuestions[questionIndex]?.question || "";

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
      {questionIndex < videoQuestions.length && (
        <div className="question">
          {questionIndex === 0 && <p>다음으로 무엇을 할까요?</p>}
          <p>{currentQuestion}</p>
          <ChatInput onSendMessage={handleSendMessage} determineCategory={determineCategory} />
        </div>
      )}

      {/* 다음 버튼 */}
      {questionIndex === videoQuestions.length && (
        <button onClick={handleNext}>다음</button>
      )}
    </div>
  );
};

export default ChatScreen;
