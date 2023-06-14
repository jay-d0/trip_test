import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Character from './Character';
import Map from './Map';
import Airport from './Airport';
import ChatScreen from './ChatScreen';
import Options from "./Options";
import Video from './Video';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Character" element={<Character />} />
        <Route path="/Map/:character" element={<Map />} />
        <Route path="/Map/:character/airport" element={<Airport />} />
        <Route path="/" element={<ChatScreen />} />
        <Route path="/Map/:character/options" element={<Options />} />
        <Route path="/Map/:character/airport/video" element={<Video />}/>
      </Routes>
    </div>
  );
}

export default App;
