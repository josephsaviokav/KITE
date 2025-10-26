import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./css/App.css";
import "./css/Home.css";
import NavBar from "./components/NavBar";
import Artist from "./pages/Artist";
import Contact from "./pages/Contact";
import Player from "./components/Player";
import { fetchSongUrl } from "./utils/api";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // Find and set the index of the selected song
    const index = availableSongs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentSongIndex(index);
    }
  };

  const handlePlayPause = (playing) => {
    setIsPlaying(playing);
  };

  const handleSongsUpdate = (songs) => {
    setAvailableSongs(songs);
  };

  const handleSongEnd = () => {
    handleNextSong();
  };

  const handleNextSong = async () => {
    if (availableSongs.length > 0) {
      setLoading(true);
      const nextIndex = (currentSongIndex + 1) % availableSongs.length;
      const nextSong = availableSongs[nextIndex];
      
      try {
        // Fetch the real playable URL from backend
        const realUrl = await fetchSongUrl(nextSong.id);
        if (!realUrl) {
          alert("Could not fetch playable song URL.");
          setLoading(false);
          return;
        }
        
        const songWithUrl = { ...nextSong, sourcepath: realUrl };
        setCurrentSong(songWithUrl);
        setCurrentSongIndex(nextIndex);
        setIsPlaying(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching song URL:", error);
        alert("Failed to load song. Please try again.");
        setLoading(false);
      }
    }
  };

  const handlePreviousSong = async () => {
    if (availableSongs.length > 0) {
      setLoading(true);
      const prevIndex = currentSongIndex - 1 < 0 ? availableSongs.length - 1 : currentSongIndex - 1;
      const prevSong = availableSongs[prevIndex];
      
      try {
        // Fetch the real playable URL from backend
        const realUrl = await fetchSongUrl(prevSong.id);
        if (!realUrl) {
          alert("Could not fetch playable song URL.");
          setLoading(false);
          return;
        }
        
        const songWithUrl = { ...prevSong, sourcepath: realUrl };
        setCurrentSong(songWithUrl);
        setCurrentSongIndex(prevIndex);
        setIsPlaying(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching song URL:", error);
        alert("Failed to load song. Please try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className={`app-container ${currentSong ? 'has-player' : ''}`}>
      <div className="page-content">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home onSongSelect={handleSongSelect} onSongsUpdate={handleSongsUpdate} />} />
          <Route path="/pages/Artist" element={<Artist />} />
          <Route path="/pages/Contact" element={<Contact />} />
        </Routes>
      </div>
      {currentSong && (
        <Player 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSongEnd={handleSongEnd}
          onNext={handleNextSong}
          onPrevious={handlePreviousSong}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;