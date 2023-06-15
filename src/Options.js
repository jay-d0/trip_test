import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import airportImage from './icons/샤를드골.png';
import './css/Options.css';

const Options = () => {
  const navigate = useNavigate();
  const { character } = useParams();

  const characters = [
    {
      name: '민성우',
      style: '먹는 것에 돈을 아끼지 않는다.',
      img_url:
        'https://w7.pngwing.com/pngs/390/806/png-transparent-rilakkuma-kakaotalk-kakao-friends-south-korea-kakaofriends-sticker-desktop-wallpaper-snout-thumbnail.png',
    },
    {
      name: '박유찬',
      style: '박물관과 미술관을 좋아한다.',
      img_url:
        'https://e7.pngegg.com/pngimages/982/1017/png-clipart-kakaotalk-kakao-friends-sticker-line-ryan-smiley-sticker.png',
    },
    {
      name: '서우석',
      style: '현지인들과 어울리기를 좋아한다.',
      img_url:
        'https://e7.pngegg.com/pngimages/825/741/png-clipart-kakaotalk-kakao-friends-sticker-iphone-iphone-electronics-smiley.png',
    },
  ];

  const selectedCharacter = characters.find((char) => char.name === character);

  const handleOptionClick = (option) => {
    navigate(`/${selectedCharacter.name}/video/${option}`);
  };

  return (
    <div className="options-container">
      <img src={airportImage} alt="airport" className="airport" />
      <img src={selectedCharacter.img_url} alt={selectedCharacter.name} className="selectedCharacter" />
      <div className="option-saying">
        <p>가고 싶은 장소를 선택해 주세요.</p>
      </div>
      <div className="option-buttons">
        <button className="option-button" onClick={() => handleOptionClick(1)}>
          Option 1
        </button>
        <button className="option-button" onClick={() => handleOptionClick(2)}>
          Option 2
        </button>
        <button className="option-button" onClick={() => handleOptionClick(3)}>
          Option 3
        </button>
      </div>
    </div>
  );
};

export default Options;
