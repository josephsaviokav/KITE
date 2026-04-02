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
      className={`circular-card ${isPlaying ? "playing" : ""}`}
      onClick={() => {
        if (typeof onClick === "function") onClick();
      }}
    >
      <div className="circular-image-container">
        {!imageLoaded && !imageError && <div className="image-placeholder"></div>}

        <img
          src={getImageUrl()}
          alt={song.title || "Unknown Track"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`circular-image ${imageLoaded ? "loaded" : ""}`}
        />

        <div className="circular-overlay">
          {isPlaying ? (
            <div className="playing-pulse">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <button className="circular-play-button" aria-label="Play">
              <Play size={24} fill="white" />
            </button>
          )}
        </div>
      </div>

      <div className="circular-info">
        <h3 className="circular-title">{ song.title || "Unknown Track"}</h3>
        <p className="circular-artist">{song.artist}</p>
        {song.year && song.year.toLowerCase() !== "unknown" && (
          <p className="circular-year">{song.year}</p>
        )}
      </div>
    </div>
  );
}

export default SongCard;
