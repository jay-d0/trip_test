import React from "react";
import "./css/Airport.css";
import airportImage from './icons/샤를드골.png'
import Input from "./Input";
import { useParams } from "react-router-dom";

export default function Airport() {
    const { character } = useParams();
  
    const characters = [
      { name: '민성우', style: '먹는 것에 돈을 아끼지 않는다.', img_url: 'https://w7.pngwing.com/pngs/390/806/png-transparent-rilakkuma-kakaotalk-kakao-friends-south-korea-kakaofriends-sticker-desktop-wallpaper-snout-thumbnail.png' },
      { name: '박유찬', style: '박물관과 미술관을 좋아한다.', img_url: 'https://e7.pngegg.com/pngimages/982/1017/png-clipart-kakaotalk-kakao-friends-sticker-line-ryan-smiley-sticker.png' },
      { name: '서우석', style: '현지인들과 어울리기를 좋아한다.', img_url: 'https://e7.pngegg.com/pngimages/825/741/png-clipart-kakaotalk-kakao-friends-sticker-iphone-iphone-electronics-smiley.png' },
    ];
  
    const selectedCharacter = characters.find((char) => char.name === character);
  
    return (
      <div className="home-container">
        <img src={airportImage} alt="airport" className="airport" />
        <img src={selectedCharacter.img_url} alt={selectedCharacter.name} className="selectedCharacter" />
        <div className="guide_saying">
          <p>샤를 드골 공항에 도착했습니다. 무엇을 하고 싶으신가요?</p>
          <br />
          <br />
          <Input className = "input" />
        </div>
      </div>
    );
  }