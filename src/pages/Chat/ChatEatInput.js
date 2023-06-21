import React, { useState } from "react";

const ChatEatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [Eat, setEat] = useState([]);

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
    /*
    <ul>
    {
      ( Eat ? (
        Eat.map((food) => {
          return (
            <div key={food["type"]}>
              <li> { food["type"] } </li>
              <ul>
                <li> title: {food["title"]} </li>              
                <li> lat: { place["lat"] } </li>    
                <li> lng: { place["lng"] } </li>
              </ul>
            </div>
          )
        }))
      : (<li></li>))
    }
  </ul>
  */
  );
};

export default ChatEatInput;
