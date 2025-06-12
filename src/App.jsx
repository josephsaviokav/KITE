import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import SongPlayer from "./pages/Songplayer";
import "./css/App.css";
import "./css/Home.css";
// import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Artist from "./pages/Artist";
import Contact from "./pages/Contact";

function App() {
  return (
   <div>
   
   <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
       {/* <Route path="/player/:id" element={<SongPlayer />} /> */}
       <Route path="/pages/Artist" element={<Artist />} />
       <Route path="/pages/Contact" element={<Contact />} />
     


      </Routes>
    </div>
</div>
  );
}

export default App;
