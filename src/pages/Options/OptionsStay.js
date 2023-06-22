import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../css/Options.css";

const OptionsStay = ({ Stay, setPlayList }) => {
  const navigate = useNavigate();
  const { character } = useParams();

  const characters = [
    {
      name: "민성우",
      style: "먹는 것에 돈을 아끼지 않는다.",
      img_url:
        "https://w7.pngwing.com/pngs/390/806/png-transparent-rilakkuma-kakaotalk-kakao-friends-south-korea-kakaofriends-sticker-desktop-wallpaper-snout-thumbnail.png",
    },
    {
      name: "박유찬",
      style: "박물관과 미술관을 좋아한다.",
      img_url:
        "https://e7.pngegg.com/pngimages/982/1017/png-clipart-kakaotalk-kakao-friends-sticker-line-ryan-smiley-sticker.png",
    },
    {
      name: "서우석",
      style: "현지인들과 어울리기를 좋아한다.",
      img_url:
        "https://e7.pngegg.com/pngimages/825/741/png-clipart-kakaotalk-kakao-friends-sticker-iphone-iphone-electronics-smiley.png",
    },
  ];

  const selectedCharacter = characters.find((char) => char.name === character);

  const [optionsData, setOptionsData] = useState({});

  const handleDataUpdate = useCallback(() => {
    const unpackedOptions = {};
    Stay.forEach((place) => {
      unpackedOptions[place.title] = place.key;
    });

    setOptionsData(unpackedOptions);

    const updatedPlayList = Stay.map((place) => {
      return {
        option: place.key,
        url: `/videos/${place.key}.mp4`,
        startTime: 1,
        endTime: 5,
      };
    });
    setPlayList(updatedPlayList);
  }, [Stay, setPlayList]);

  useEffect(() => {
    handleDataUpdate();
  }, []);

  const handleOptionClick = (option) => {
    navigate(
      `/${encodeURIComponent(character)}/video/${encodeURIComponent(option)}`
    );
  };

  const renderOptions = () => {
    return Object.entries(optionsData).map(([label, option]) => (
      <button
        key={label}
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

export default OptionsStay;
