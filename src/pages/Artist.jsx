import ArtistCard from "../components/ArtistCard";
import "../css/Artist.css";
import LoadingScreen from "../components/LoadingScreen";
import { useState, useEffect } from "react";
import { artist } from "../assets/artists";
import Player from "../components/Player";

export default function Artist() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(artist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = artist.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="home">
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading"><LoadingScreen /></div>
      ) : (
        <>
          <div className="movies-grid">
            {currentItems.map((song) => (
              <ArtistCard song={song} key={song.id} />
            ))}
          </div>

          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
   
    </div>
  );
}
