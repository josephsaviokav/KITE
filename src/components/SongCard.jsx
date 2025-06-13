import { useState } from "react";
import { Play } from "lucide-react";
import "../css/SongCard.css";

function SongCard({ song, onClick, isPlaying }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  const getImageUrl = () =>
    imageError || !song.primaryImage
      ? "https://placehold.co/500x500?text=No+Cover&font=roboto"
      : song.primaryImage;

  return (
    <div
      className={`movie-card ${isPlaying ? "playing" : ""}`}
      onClick={() => {
        if (typeof onClick === "function") onClick();
      }}
    >
      <div className="movie-poster">
        {!imageLoaded && !imageError && <div className="image-placeholder"></div>}

        <img
          src={getImageUrl()}
          alt={song.title || "Unknown Track"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`song-image ${imageLoaded ? "loaded" : ""}`}
        />

        <div className="movie-overlay">
          {isPlaying ? (
            <div className="playing-pulse">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <button className="play-button" aria-label="Play">
              <Play size={24} fill="white" />
            </button>
          )}
        </div>
      </div>

      <div className="movie-info">
        <h3>{ song.title || "Unknown Track"}</h3>
        <p className="artist">{song.artist}</p>
        {song.year && song.year.toLowerCase() !== "unknown" && (
          <p className="year">{song.year}</p>
        )}
      </div>
    </div>
  );
}

export default SongCard;
