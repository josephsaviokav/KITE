import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./css/App.css";
import "./css/Home.css";
import NavBar from "./components/NavBar";
import Artist from "./pages/Artist";
import Contact from "./pages/Contact";
import Player from "./components/Player";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = (playing) => {
    setIsPlaying(playing);
  };

  return (
    <div className={`app-container ${currentSong ? 'has-player' : ''}`}>
      <div className="page-content">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home onSongSelect={handleSongSelect} />} />
          <Route path="/pages/Artist" element={<Artist />} />
          <Route path="/pages/Contact" element={<Contact />} />
        </Routes>
      </div>
      {currentSong && (
        <Player 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </div>
  );
}

export default App;