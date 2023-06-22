import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../css/Options.css";

const OptionsDo = ({ Do, setPlayList }) => {
  const navigate = useNavigate();
  const { character } = useParams();

  const [optionsData, setOptionsData] = useState({});

  const handleDataUpdate = useCallback(() => {
    const unpackedOptions = {};
    Do.forEach((place) => {
      unpackedOptions[place.key] = place.title;
    });

    setOptionsData(unpackedOptions);

    const updatedPlayList = Do.map((place) => {
      return {
        option: place.key,
        url: `/videos/${place.key}.mp4`,
        startTime: 1,
        endTime: 5,
      };
    });
    setPlayList(updatedPlayList);
  }, [Do, setPlayList]);

  useEffect(() => {
    handleDataUpdate();
  }, []);

  const handleOptionClick = (option) => {
    navigate(
      `/${encodeURIComponent(character)}/video/${encodeURIComponent(option)}`
    );
  };

  const renderOptions = () => {
    return Object.entries(optionsData).map(([option, label]) => (
      <button
        key={option}
        className="option-button"
        onClick={() => handleOptionClick(option)}
      >
        {label}
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

export default OptionsDo;
