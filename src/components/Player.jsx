import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import "../css/Player.css";

export default function Player({ currentSong, isPlaying, onPlayPause, onSongEnd, onNext, onPrevious, loading }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100); // Default volume at 100%

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
    if (audio && audio.duration) {
      const current = audio.currentTime;
      const total = audio.duration;
      setProgress((current / total) * 100);
      setDuration(total);
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
    const newMuteStatus = !isMuted;
    audio.muted = newMuteStatus;
    setIsMuted(newMuteStatus);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.volume = value / 100;
    setVolume(value);
    if (value === 0) {
      setIsMuted(true);
      audio.muted = true;
    } else {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.sourcepath) return;

    audio.src = currentSong.sourcepath;
    audio.load();
    audio.volume = volume / 100;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      if (isPlaying) {
        audio.play().catch((err) => {
          console.error("Auto-play failed:", err);
          onPlayPause(false);
        });
      }
    };

    const handleEnded = () => {
      onPlayPause(false);
      // Trigger next random song
      if (onSongEnd) {
        onSongEnd();
      }
    };

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
          src={currentSong?.primaryImage || "https://placehold.co/100x100?text=No+Cover"}
          alt={currentSong?.title || "No Cover"}
          className="album-cover"
        />
        <div className="track-info">
          <h3>{currentSong?.title || "No song selected"}</h3>
          <p>{currentSong?.artist || "Unknown Artist"}</p>
        </div>
      </div>

      <div className="player-controls">
        <div className="time-display">
          <span>{formatTime((progress / 100) * duration)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="control-buttons">
          <button onClick={onPrevious} className="skip-button" aria-label="Previous" disabled={loading}>
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlay} className="play-button" aria-label="Play/Pause" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
          <button onClick={onNext} className="skip-button" aria-label="Next" disabled={loading}>
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <div className="volume-control">
        <button onClick={toggleMute} className="volume-button" aria-label="Mute/Unmute">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
}
