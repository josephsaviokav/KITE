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
    handleNextSongRandom();
  };

  // Get the next alphabet letter (5 positions ahead, wrapping around)
  const getNextAlphabetLetter = (firstLetter) => {
    if (!firstLetter || !isNaN(firstLetter)) return null; // If starts with number, return null
    
    const letter = firstLetter.toUpperCase();
    const charCode = letter.charCodeAt(0);
    
    // Only work with A-Z
    if (charCode < 65 || charCode > 90) return null;
    
    // Get index (A=0, B=1, ..., Z=25)
    const index = charCode - 65;
    
    // Calculate next index (5 positions ahead, wrapping around)
    const nextIndex = (index + 5) % 26;
    
    // Convert back to letter
    return String.fromCharCode(65 + nextIndex);
  };

  const handleNextSongRandom = async () => {
    if (availableSongs.length === 0) return;

    setLoading(true);
    
    try {
      // Get first letter of current song title
      const currentTitle = currentSong?.title || "";
      const firstLetter = currentTitle.charAt(0);
      
      // Get the target letter (5 alphabets ahead)
      const targetLetter = getNextAlphabetLetter(firstLetter);
      
      // Filter songs that start with the target letter
      let candidateSongs = availableSongs;
      
      if (targetLetter) {
        candidateSongs = availableSongs.filter(song => 
          song.title && song.title.charAt(0).toUpperCase() === targetLetter
        );
      }
      
      // If no songs match, pick a random song from all available
      if (candidateSongs.length === 0) {
        candidateSongs = availableSongs;
      }
      
      // Pick a random song from candidates
      const randomIndex = Math.floor(Math.random() * candidateSongs.length);
      const nextSong = candidateSongs[randomIndex];
      
      if (!nextSong) {
        setLoading(false);
        return;
      }
      
      // Fetch the real playable URL from backend
      const realUrl = await fetchSongUrl(nextSong.id);
      if (!realUrl) {
        console.error("Could not fetch playable song URL.");
        setLoading(false);
        return;
      }
      
      const songWithUrl = { ...nextSong, sourcepath: realUrl };
      setCurrentSong(songWithUrl);
      setIsPlaying(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching random song:", error);
      setLoading(false);
    }
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