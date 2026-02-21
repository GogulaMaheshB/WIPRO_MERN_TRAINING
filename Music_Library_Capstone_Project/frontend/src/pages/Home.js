import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { usePlayer } from "../context/PlayerContext";
import { GiPlayButton } from "react-icons/gi";

export default function Home() {
  const [songs, setLocalSongs] = useState([]);
  const navigate = useNavigate();

  const {
    songs: playerSongs,
    current,
    playing,
    setSongs,
    setCurrent,
    setPlaying
  } = usePlayer();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
  .then(res => res.json())
  .then(data => {
    const visibleSongs = data.filter(song => song.isVisible);
    setLocalSongs(visibleSongs);
  })}
, []);

  const requireLogin = () => {
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const playSong = (clickedSong, list) => {
    if (!requireLogin()) return;

    setSongs(list);
    const index = list.findIndex(s => s._id === clickedSong._id);
    setCurrent(index);
    setPlaying(true);
  };

  const openDetails = (songId) => {
    if (!requireLogin()) return;
    navigate(`/songs/${songId}`);
  };

  const languages = [
    "Telugu",
    "Hindi",
    "English",
    "Tamil",
    "Kannada"
  ];

  return (
    <div className="home">
      {!token && (
        <section className="hero hero-carousel">
          <div className="carousel-bg">
            <img src="/images/bg1.jpg" alt="bg1" />
            <img src="/images/bg2.jpg" alt="bg2" />
            <img src="/images/bg3.jpg" alt="bg3" />
          </div>

          {/* DARK OVERLAY */}
          <div className="hero-overlay"></div>

          {/* CONTENT */}
          <div className="home-content">
            <h1>Welcome to Maahi Music Library</h1>
            <p>Listen Songs, and Create Playlists</p>

            <div className="home-buttons">
              <button onClick={() => navigate("/login")}>LOGIN</button>
              <button onClick={() => navigate("/register")}>REGISTER</button>
            </div>
          </div>
        </section>

      )}

      <section className="collections">
        {languages.map(lang => {
          const langSongs = songs.filter(s => s.language === lang);
          if (!langSongs.length) return null;

          return (
            <div key={lang} className="language-section">
              <h2>{lang}</h2>

              <div className="song-row">
                {langSongs.map(song => {
                  const isActive =
                    playing &&
                    playerSongs[current]?._id === song._id;

                  return (
                    <div
                      key={song._id}
                      className={`song-card ${isActive ? "active-playing" : ""}`}
                    >
                      <img
                        src={`http://localhost:5000${song.coverUrl}`}
                        alt={song.title}
                        style={{
                          width: "90%",
                          height: "280px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          cursor: "pointer"
                        }}
                        onClick={() => openDetails(song._id)}
                      />

                      <p
                        onClick={() => openDetails(song._id)}
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#facc15",
                          cursor: "pointer",
                          marginTop: "12px",
                          textAlign: "center"
                        }}
                      >
                        {song.album}
                      </p>
                      <p>{song.title}</p>

                      <button
                        className="play-btn"
                        onClick={() => playSong(song, langSongs)}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: " translate(-50%, -50%)",
                          marginTop: "10px",
                          background: "#facc15",
                          border: "none",
                          borderRadius: "50%",
                          width: "56px",
                          height: "56px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",


                          boxShadow: "0 6px 20px rgba(250,204,21,0.35)",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.15)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 30px rgba(250,204,21,0.6)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow =
                            "0 6px 20px rgba(250,204,21,0.35)";
                        }}
                      >
                        <GiPlayButton
                          style={{
                            fontSize: "32px",
                            color: "#020617",
                            marginLeft: "3px"
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
