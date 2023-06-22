import React, { useState } from "react";

const ChatEatInput = ({ onSendMessage, setEat }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    /* communicate.post('/food',
    { q,
      A,
      pers_price
    }).then((res) => {
    setEat(res.data);
    })*/
    event.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

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

export default ChatEatInput;
