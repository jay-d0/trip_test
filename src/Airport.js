import React from "react";
import "./css/Airport.css";
import airportImage from './icons/샤를드골.png'
import Input from "./Input";
import { useParams } from "react-router-dom";

export default function Airport() {
    const { character } = useParams();
  
    const characters = [
        { name: 'A', style: 'Fast', img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU' },
        { name: 'B', style: 'Fast', img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU' },
        { name: 'C', style: 'Fast', img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU' },
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