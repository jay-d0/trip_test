import React from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css";
import logoImage from "../../icons/Plane.gif";

export default function Home() {
  return (
    <div className="background-color">
      <div className="home-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <div className="content">
          <h1>Visual Studio Travel</h1>
          <h2>내맘대로 체험하는 All-Day 가상여행 서비스</h2>
          <Link to="./Character">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/5261/5261565.png"}
              alt="start"
              className="start"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
