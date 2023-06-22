import React, { useState, useEffect } from "react";
import "../../css/End.css";
import { useNavigate, useParams, Link } from "react-router-dom";

function End() {
  const navigate = useNavigate();

  const guideText = [
    "오늘 하루 고생 많으셨습니다. 즐거운 여행이 되었길 바랍니다.",
  ];

  const backtoHome = () => {
    console.log("Next button clicked");
    navigate(`/`);
  };

  return (
    <div className="video-chat-container">
      <div className="home-container">
        <div className="guide_saying">
          <p>{guideText}</p>
          <button className="next-button" onClick={backtoHome}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
export default End;
