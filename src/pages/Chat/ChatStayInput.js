import React, { useState } from "react";

const ChatStayInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [stay, setStay] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    /* communicate.post('/hotel',
    { A,
      pers_price,
      pers_aspect
    }).then((res) => {
    setStay(res.data);
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
      ( Stay ? (
        Stay.map((hotel) => {
          return (
            <div key={hotel"title"]}>
              <li> { hotel["title"] } </li>
              <ul>
                <li> review: { hotel["review"] } </li>    
                <li> similarity: { place["similarity"] } </li>
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

export default ChatStayInput;
