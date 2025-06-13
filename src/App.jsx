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

  return (
    <div>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home onSongSelect={setCurrentSong} />} />
          <Route path="/pages/Artist" element={<Artist />} />
          <Route path="/pages/Contact" element={<Contact />} />
        </Routes>
        {currentSong && <Player currentSong={currentSong} />}
      </div>
    </div>
  );
}

export default App;