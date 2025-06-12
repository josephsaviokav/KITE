import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import "../css/Player.css"; // <-- Import the CSS file

export default function Player() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
   
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration;
      setDuration(total);
      setProgress((current / total) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="player-container">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={handleProgressChange}
        className="progress-bar"
      />

      <div className="player-info">
        <img
          src="https://c.saavncdn.com/858/Ember-English-2017-20170915151516-50x50.jpg"
          alt="Album Cover"
          className="album-cover"
        />
        <div className="track-details">
          <h2 className="track-title">Ember</h2>
          <p className="track-artist">Billie Eilish</p>
        </div>
      </div>

      <div className="player-controls">
        <button  className="control-button">
          <SkipBack size={24} />
        </button>

        <button onClick={togglePlay} className="play-button">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        <button  className="control-button">
          <SkipForward size={24} />
        </button>
      </div>
      
    </div>
  );
}
