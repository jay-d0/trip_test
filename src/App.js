import React from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Home from './Home';
import Character from './Character';
import Map from './Map';
import Airport from './Airport'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Character" element={<Character />} />
        <Route path="/Map/:character" element={<Map />} />
        <Route path="/Map/:character/airport" element={<Airport />} />
      </Routes>
    </div>
  );
}

export default App;
