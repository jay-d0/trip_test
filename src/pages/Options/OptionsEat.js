import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../css/Options.css";

const OptionsEat = ({ Eat, setPlayList, setCo }) => {
  const navigate = useNavigate();
  const { character } = useParams();
  // const [hover, setHover] = useState(0);

  const [optionsData, setOptionsData] = useState({});

  const handleDataUpdate = useCallback(() => {
    const unpackedOptions = {};
    Eat.forEach((place) => {
      unpackedOptions[place.key] = [place.title, [place.lat, place.lng]];
    }); // 'place' 항목의 'key'를 객체의 키로, 'title'을 객체의 값으로 할당

    setOptionsData(unpackedOptions);

    // VideoPlayer.js의 playList 업데이트 (App.js에 업데이트 되어 있음)
    const updatedPlayList = Eat.map((place) => {
      return {
        option: `${encodeURIComponent(place.key)}`,
        url: `/videos/${place.key}.mp4`,
        startTime: 1,
        endTime: 5,
      };
    });
    setPlayList(updatedPlayList);
  }, [Eat]);

  useEffect(() => {
    handleDataUpdate();
  }, []); // Eat 배열이 변경될 때마다 handleDataUpdate 함수 호출

  const handleOptionClick = (option) => {
    navigate(
      `/${encodeURIComponent(character)}/video/${encodeURIComponent(option)}`
    );
  };

  const renderOptions = () => {
    return Object.entries(optionsData).map(([option, arr]) => (
      <button
        key={option}
        className="option-button"
        onClick={() => {
          handleOptionClick(option);
          setCo(arr[1]);
        }}
        // onMouseOver={setHover(1)}
        // onMouseLeave={setHover(0)}
      >
        {/* {hover ? option : } */ arr[0]}
      </button>
    ));
  };

  return (
    <div className="options-container">
      <div className="option-saying">
        <p>가고 싶은 장소를 선택해 주세요.</p>
      </div>
      <div className="option-buttons">{renderOptions()}</div>
    </div>
  );
};

export default OptionsEat;
