import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Character from './Character';
import Map from './Map';
import Airport from './Airport';
import ChatScreen from './ChatScreen';
import Options from './Options';
import Video from './Video';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<Character />} />
        <Route path="/map/:character" element={<Map />} />
        <Route path="/map/:character/airport" element={<Airport />} />
        <Route path="/map/:character/options" element={<Options />} />
        <Route path="/:character/video/:option" element={<Video />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </div>
  );
}

export default App;
