import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import "../css/Player.css";

export default function Player({ currentSong, isPlaying, onPlayPause }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        onPlayPause(false);
      } else {
        await audio.play();
        onPlayPause(true);
      }
    } catch (err) {
      console.error("Playback error:", err);
      onPlayPause(false);
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio && duration > 0) {
      setProgress((audio.currentTime / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.sourcepath) return;

    // Set up audio source
    audio.src = currentSong.sourcepath;
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      if (isPlaying) {
        audio.play().catch(err => {
          console.error("Auto-play failed:", err);
          onPlayPause(false);
        });
      }
    };

    const handleEnded = () => onPlayPause(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong?.sourcepath]);

  return (
    <div className="player-container">
      <audio ref={audioRef} preload="auto" />

      <div className="player-info">
        <img
          src={currentSong?.primaryImage || "https://placehold.co/150?text=No+Cover"}
          alt={currentSong?.title || "No Cover"}
          className="album-cover"
        />
        <div className="track-info">
          <h3>{currentSong?.title || "No song selected"}</h3>
          <p>{currentSong?.artist || "Unknown Artist"}</p>
        </div>
      </div>

      <div className="player-controls">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="progress-bar"
        />

        <button onClick={togglePlay} className="play-button" aria-label="Play/Pause">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button onClick={toggleMute} className="volume-button" aria-label="Mute/Unmute">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
}
