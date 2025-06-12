import SongCard from "../components/SongCard";
// import { useState } from "react";
import "../css/Artist.css";
import LoadingScreen from "../components/LoadingScreen";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { searchMovies, getPopularMovies } from "../services/api";
// function Home() {
//   // const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const songs = [
//     {
//       id: "1",
//       title: "Shape of You",
//       primaryTitle: "Shape of You",
//       releaseDate: "2017",
//       artist: "Ed Sheeran",
//       primaryImage:
//         "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
//       sourcepath: "/shapeofyou.mp3",
//       runtime: "3:55",
//     },
//     {
//       id: "2",
//       title: "Believer",
//       primaryTitle: "Believer",
//       releaseDate: "2019",
//       artist: "Imagine Dragons",
//       primaryImage:
//         "https://i.scdn.co/image/ab67616d0000b2735675e83f707f1d7271e5cf8a",
//       sourcepath: "/believer.mp3",
//     },
//     {
//       id: "3",
//       title: "Blinding Lights",
//       primaryTitle: "Blinding Lights",
//       releaseDate: "2019",
//       artist: "The Weeknd",
//       primaryImage:
//         "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
//       sourcepath: "/blindinglights.mp3",
//     },
//     {
//       id: "4",
//       title: "No Time To Die",
//       primaryTitle: "No Time To Die",
//       releaseDate: "2021",
//       artist: "Billie Eilish",
//       primaryImage:
//         "https://i.scdn.co/image/ab67616d0000b273f7b7174bef6f3fbfda3a0bb7",
//       sourcepath: "/notimetodie.mp3",
//     },
//     {
//       id: "5",
//       title: "Twisted Nerve",
//       primaryTitle: "Twisted Nerve",
//       releaseDate: "1968",
//       artist: "Bernard Herrmann",
//       primaryImage:
//         "https://i.scdn.co/image/ab67616d0000b273fecfac11994325a39cd03dec",
//       runtime: "3:55",
//       sourcepath: "/twistednerve.mp3",
//     },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchQuery(e.target.value);
//   };

//   const handleClick = (song) => {
//     navigate(`/player/${song.id}`, { state: { song } });
//   };

//   return (
//     <div className="home">
//       {loading ? (
//         <div className="loading">
//           <LoadingScreen />
//         </div>
//       ) : (
//         <div className="movies-grid">

//           {songs.map((song) => (
//             <div
//               key={song.id}
//               onClick={() => handleClick(song)}
//               style={{ cursor: "pointer" }}
//             >
//               <SongCard song={song} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

export default function Artist() {
//     const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);//remember to turn it off after getting the data
  const songs = [
    {
      id: "1",
      title: "Ed Sheeran",
      primaryTitle: "Ed Sheeran",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5eb399444ed4eace08b549d1161",
      sourcepath: "/shapeofyou.mp3",
      runtime: "3:55",
    },
    {
      id: "2",
      title: "Taylor Swift",
      primaryTitle: "Taylor Swift",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
      sourcepath: "/believer.mp3",
    },
    {
      id: "3",
      title: "The Weeknd",
      primaryTitle: "The Weeknd",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
      sourcepath: "/blindinglights.mp3",
    },
    {
      id: "4",
      title: "Justin Bieber",
      primaryTitle: "Justin Bieber",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36",
      sourcepath: "/notimetodie.mp3",
    },
    {
      id: "1",
      title: "Ed Sheeran",
      primaryTitle: "Ed Sheeran",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5eb399444ed4eace08b549d1161",
      sourcepath: "/shapeofyou.mp3",
      runtime: "3:55",
    },
    {
      id: "2",
      title: "Taylor Swift",
      primaryTitle: "Taylor Swift",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
      sourcepath: "/believer.mp3",
    },
    {
      id: "3",
      title: "The Weeknd",
      primaryTitle: "The Weeknd",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
      sourcepath: "/blindinglights.mp3",
    },
    {
      id: "4",
      title: "Justin Bieber",
      primaryTitle: "Justin Bieber",
      
      primaryImage:
        "https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36",
      sourcepath: "/notimetodie.mp3",
    },
    
  ];
//  useEffect(() => {
//     const loadPopularMovies = async () => {
//       try {
//         const popularMovies = await getPopularMovies();
//         setMovies(popularMovies);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to load movies...");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPopularMovies();
//   }, []);

 return( <div className="home">
    
<form className="search-form">
  <input type="text" placeholder="What do you want to play?" />
  
<button class="button">
  <span class="span">🔎</span>
</button>
</form>
        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading"><LoadingScreen /></div>
      ) : (
        <div className="movies-grid">
          {songs.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </div>
      )}
    </div>
  );
}
