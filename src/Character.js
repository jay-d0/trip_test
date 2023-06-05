import React from 'react';
import { Link } from 'react-router-dom';
import Guide from './Guide';
import './App.css';
import './css/Character.css';

function Character() {
  const characters = [
    { name: 'A', style: 'Fast', img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU' },
    { name: 'B', style: 'Fast', img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU' },
    { name: 'C', style: 'Fast', img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU' },
  ];

  return (
    <div className="many_guides">
      {characters.map((character) => (
        <Link key={character.name} to={`/Map/${character.name}`}>
          <Guide name={character.name} style={character.style} img_url={character.img_url} />
        </Link>
      ))}
    </div>
  );

}

export default Character;
