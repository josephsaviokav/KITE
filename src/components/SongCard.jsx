import "../css/SongCard.css"


function SongCard({song}) {
    
  

  
return <div className="movie-card">
        <div className="movie-poster">
            <img src={song.primaryImage} alt={song.title}/>
           <div className="movie-overlay">
             
            </div>
            



            
        </div>
        <div className="movie-info">
          
            <h3>{song.primaryTitle}</h3>
           <p>{song.artist}</p>
       
            <p>{song.releaseDate}</p>
          
            
        </div>
    </div>
}


export default SongCard