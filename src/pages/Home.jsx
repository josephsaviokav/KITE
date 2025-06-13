import { useState, useEffect } from "react";
import { fetchSongs } from "../utils/api";
import SongCard from "../components/SongCard";
import LoadingScreen from "../components/LoadingScreen";
import Player from "../components/Player";
import "../css/Home.css";

export default function Home() {
  const [state, setState] = useState({
    error: null,
    loading: false,
    searchQuery: "",
    songs: [],
    currentSong: null,
    isPlaying: false
  });

  const formatDuration = (seconds) => {
    if (!seconds) return "3:30";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSongSelect = (song) => {
    if (!song?.sourcepath) {
      alert("Song URL is invalid or missing.");
      return;
    }
    console.log("Selected:", song.title, "→ URL:", song.sourcepath);
    setState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true
    }));
  };

  const searchSongs = async (query) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const results = await fetchSongs(query);

      if (!results || results.length === 0) {
        throw new Error("No songs found. Try a different search term.");
      }

      const formattedSongs = results.map((song, index) => ({
        id: song.id || song.perma_url || `song-${index}`,
        title: song.song || song.heading?.title || "Untitled Track",
        artist: song.primary_artists || song.artist?.name || song.heading?.subtitle || "Unknown Artist",
        primaryImage: song.image?.replace("150x150", "500x500") ||
                     song.image?.replace("150", "500") ||
                     song.thumbnail ||
                     "https://placehold.co/500x500?text=No+Cover",
        sourcepath: (song.more_info?.media_preview_url || "").replace(".mp4", ".mp3"),
        duration: formatDuration(song.more_info?.duration || song.duration),
        album: song.more_info?.album || "Unknown Album",
        year: song.year || new Date().getFullYear().toString()
      }));

      setState(prev => ({
        ...prev,
        songs: formattedSongs,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err.message || "Failed to fetch songs. Please try again.",
        loading: false
      }));
    }
  };

  useEffect(() => {
    searchSongs("trending");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      searchSongs(state.searchQuery.trim());
    }
  };

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="What do you want to play?" 
          value={state.searchQuery}
          onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
          aria-label="Search for songs"
        />
        <button 
          className="button" 
          type="submit" 
          disabled={state.loading}
          aria-busy={state.loading}
        >
          {state.loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>🔎</span>
            </>
          ) : (
            "🔎"
          )}
        </button>
      </form>

      {state.error && (
        <div className="error-message" role="alert">
          <p>{state.error}</p>
          <button 
            onClick={() => searchSongs(state.searchQuery || "trending")} 
            className="retry-button"
          >
            Retry Search
          </button>
        </div>
      )}

      {state.loading ? (
        <div className="loading">
          <LoadingScreen />
        </div>
      ) : (
        <>
          {state.songs.length > 0 ? (
            <div className="movies-grid">
              {state.songs.map((song) => (
                <SongCard 
                  song={song} 
                  key={song.id} 
                  onClick={() => handleSongSelect(song)}
                  isPlaying={state.currentSong?.id === song.id && state.isPlaying}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No songs found. Try a different search.</p>
            </div>
          )}
        </>
      )}

      {state.currentSong && (
        <Player 
          currentSong={state.currentSong}
          onPlayPause={(playing) => setState(prev => ({ ...prev, isPlaying: playing }))}
        />
      )}
    </div>
  );
}
