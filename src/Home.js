import React from "react";
import './App.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {

  return (
    <div>
      <h1>YBIGTOUR</h1>
    <Link to="./Character">
        <button>START</button>
    </Link>
    </div>
  );
}