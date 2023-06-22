import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatEatInput from "./ChatEatInput";
import communicate from "../../communicate";

import "../../css/ChatScreen.css";

const ChatEat = ({ character, onTextChange, setEat, category }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [eatEat, setEatEat] = useState([]);
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTextChange = (text) => {
    onTextChange(text); // Call the onTextChange prop
  };

  const [videoEatQuestions, setQ] = useState(["", ""]);

  useEffect(() => {
    if (category === "cafe") {
      setQ([
        "구체적으로 어떤 음료를 마시고 싶은지 말씀해주시면 제가 알려드릴게요!",
        "선호하는 카페에 대해 구체적으로 알려주시면 더 좋은 추천을 해드릴게요.",
      ]);
    } else if (category === "meal") {
      setQ([
        "어떤 식사를 하고 싶으신가요?",
        "구체적인 식당 분위기나 원하시는 내용이 있으실까요?",
      ]);
    } else if (category === "bar") {
      setQ([
        "어떤 술을 마시고 싶으신가요? 정해두신 주류 종류가 있으신가요?",
        "구체적인 가게 분위기나 원하는 내용이 있으실까요?",
      ]);
    }

    if (questionIndex === videoEatQuestions.length) {
      onTextChange("");
    }
  }, []);

  const characterArray = [
    {
      name: "서우석",
      food_price: "normal",
      hotel_price: "low",
      hotel_aspects: "cleanness,traffic,kindness",
      place_famous: "Famous",
    },
  ];

  const handleNext = () => {
    communicate
      .post("/" + category, {
        A: messages[0].text + messages[1].text,
        pers_price: characterArray.filter((item) => {
          return item.name === character ? item : null;
        })[0].food_price,
      })
      .then((res) => {
        setEat(res.data);
        setEatEat(res.data);
      });
  };

  useEffect(() => {
    if (eatEat.length > 0) {
      navigate(`/${encodeURIComponent(character)}/options/eat`);
    }
  }, [eatEat]);

  return (
    <div className="chat-screen">
      {/* 메시지 내용 */}
      {/*<div className="messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        </div>*/}

      {/* 현재 질문 및 input */}
      {questionIndex < videoEatQuestions.length && (
        <div className="question">
          <p>{videoEatQuestions[questionIndex]}</p>
          <ChatEatInput
            onSendMessage={handleSendMessage}
            onTextChange={handleTextChange}
          />
        </div>
      )}

      {/* 다음 버튼 */}
      {questionIndex === videoEatQuestions.length && (
        <button onClick={handleNext}>다음</button>
      )}
    </div>
  );
};

export default ChatEat;
