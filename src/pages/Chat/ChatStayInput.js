import React, { useState, useEffect } from "react";
import communicate from "../../communicate";

const ChatStayInput = ({ onSendMessage, character, setStay }) => {
  const [message, setMessage] = useState("");
  const [stayStay, setStayStay] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const characterArray = [
    {
      name: "서우석",
      food_price: "normal",
      hotel_price: "low",
      hotel_aspects: "cleanness,traffic,kindness",
      place_famous: "Famous",
    },
  ];

  const handleSubmit = (event) => {
    if (message.trim() !== "") {
      communicate
        .post("/hotel", {
          A: message,
          pers_price: characterArray.filter((item) => {
            return item.name === character ? item : null;
          })[0].hotel_price,
          pers_aspect: characterArray.filter((item) => {
            return item.name === character ? item : null;
          })[0].hotel_aspects,
        })
        .then((res) => {
          setStay(res.data);
          setStayStay(res.data);
        });

      event.preventDefault();
    }
  };

  useEffect(() => {
    if (stayStay.length > 0) {
      onSendMessage(message);
    }
  }, [stayStay]);

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={handleInputChange}
      />
      <button type="submit">보내기</button>
    </form>
  );
};

export default ChatStayInput;
