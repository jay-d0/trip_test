import React from 'react';
import Guide from "./Guide";
import "./css/Character.css"

export default function Character() {
  return (
    <div>
      <Guide name="A" style="fast" img_url="www.naver.com" />
      <Guide name="B" style="fast" img_url="www.naver.com" />
      <Guide name="C" style="fast" img_url="www.naver.com" />
    </div>
  );
}