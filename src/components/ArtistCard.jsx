import "../css/ArtistCard.css"


function ArtistCard({song}) {
    
  var artist_id = song.artist_id;

  
return (
    
    <div
        className="movie-card"
        onClick={() => window.open(`https://open.spotify.com/artist/${artist_id}`)}
        style={{ cursor: "pointer" }}
    >
        
        <div className="movie-poster">
            
            <img src={song.artist_img} alt={song.artist_name} />
            <div className="movie-overlay"></div>
        </div>
       
        <div className="movie-info">
            <h3>{song.artist_name}</h3>
            <p>genre: {song.artist_genre}</p>
            <p>country: {song.country}</p>
        </div>
         <div className="movie-hover-message">
            <p>Click to view on Spotify</p>
        </div>
    </div>
    
);

}
export default ArtistCard