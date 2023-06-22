import React from "react";
import { Link } from "react-router-dom";
import Guide from "./Guide";
import "../../App.css";
import "../../css/Character.css";
import "../../css/Home.css";
import test from "../../icons/test.gif";

import 서우석 from "../../icons/서우석.gif";
import 민성우 from "../../icons/민성우.gif";
import 박유찬 from "../../icons/박유찬.gif";

function Character() {
  const characters = [
    {
      name: "민성우",
      style:
        "오기 전 철저한 계획을 세웠으며 역사와 문화에 대한 깊은 관심을 가지고 있다.",
      goal: "역사적인 장소를 탐험하며 독특한 경험을 추구한다.",
      mbti: "ENTJ",
      money: "Old and Rich",
      img_url: 민성우,
    },

    {
      name: "서우석",
      style:
        "즉흥적인 성향을 가진 20대 대학생이다. 유럽 여행이 처음이고 배낭여행 중이다.",
      goal: "유명 관광지만 빠르게 도장 찍고 싶어 한다.",
      mbti: "ESFP",
      money: "Young and Poor",
      img_url: 서우석,
    },

    {
      name: "박유찬",
      style: "가족과 함께 방문할 예정이며, 안정적인 여행을 선호한다.",
      goal: "가족과 시간을 즐기며 휴식과 재충전하고 싶어한다.",
      mbti: "ISFJ",
      money: "Young and Rich",
      img_url: 박유찬,
    },
  ];

  return (
    <div className="background-color">
      <div className="many_guides">
        <div className="card-row">
          {characters.map((character) => (
            <Link
              key={character.name}
              to={`/${character.name}/map`}
              className="guide"
            >
              <div className="card">
                <img
                  className="character-img"
                  src={character.img_url}
                  alt={character.name}
                />
                <h2>{character.name}</h2>
                <br />
                <div className="character-info">
                  <p>STYLE : {character.style}</p>
                  <p>MBTI : {character.mbti}</p>
                  <p>MONEY : {character.money}</p>
                  <p>GOAL: {character.goal}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Character;
