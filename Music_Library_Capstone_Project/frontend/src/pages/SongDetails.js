import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/SongDetails.css";
import { usePlayer } from "../context/PlayerContext";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward, FaPlus
} from "react-icons/fa";

export default function SongDetails() {
  const { id } = useParams();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);


  const {
    songs,
    current,
    setSongs,
    setCurrent,
    playing,
    setPlaying,
    audioRef
  } = usePlayer();

  /* ================= FETCH ALL SONGS ================= */
  useEffect(() => {
    // Step 1: Fetch clicked song
    fetch(`http://localhost:5000/api/songs/${id}`)
      .then(res => res.json())
      .then(clickedSong => {

        if (!clickedSong) return;

        // Step 2: Fetch songs by same language
        fetch(`http://localhost:5000/api/songs?language=${clickedSong.language}`)
          .then(res => res.json())
          .then(languageSongs => {

            setSongs(languageSongs);

            const index = languageSongs.findIndex(
              s => s._id === clickedSong._id
            );

            if (index !== -1) {
              setCurrent(index);
            }
          });
      });

  }, [id, setSongs, setCurrent]);
  useEffect(() => {
    fetch("http://localhost:5000/api/playlists", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlaylists(data);
        } else if (Array.isArray(data.playlists)) {
          setPlaylists(data.playlists);
        }
      });
  }, []);
  const addToPlaylist = async (playlistId, songId) => {
    await fetch(
      `http://localhost:5000/api/playlists/${playlistId}/add-song`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ songId })
      }
    );

    setShowPlaylists(false);
    alert("Song added to playlist");
  };




  /* ================= SYNC TIME FROM GLOBAL AUDIO ================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef, current]);



  if (!songs.length) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  const song = songs[current];

  return (
    <div className="song-details-page">

     
      <div className="details-hero-carousel">
        <div className="details-carousel-bg">
          <img src="/images/bg1.jpg" alt="bg1" />
          <img src="/images/bg2.jpg" alt="bg2" />
          <img src="/images/bg3.jpg" alt="bg3" />
        </div>
        <div className="details-hero-overlay"></div>

        
        <div className="details-hero-content">


          <div className="song-detail-card">
            <div className="image-wrapper">
              <img
                src={`http://localhost:5000${song.coverUrl}`}
                alt={song.title}
              />

              <FaPlus
                className="add-icon-image"
                onClick={() => setShowPlaylists(!showPlaylists)}
              />

              {showPlaylists && (
                <div className="playlist-popup">
                  {playlists.length === 0 ? (
                    <p>No playlists found</p>
                  ) : (
                    playlists.map(p => (
                      <div
                        key={p._id}
                        className="playlist-option"
                        onClick={() => addToPlaylist(p._id, song._id)}
                      >
                        {p.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>


            <h2>{song.title}</h2>

            <p><strong>Artists:</strong> {song.artist}</p>
            <p><strong>Music Director:</strong> {song.musicDirector}</p>
            <p><strong>Album:</strong> {song.album}</p>

            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(song.releaseDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </p>

            <p><strong>Language:</strong> {song.language}</p>




            
            <div className="icon-player">

              <button
                onClick={() =>
                  setCurrent(prev =>
                    prev === 0 ? songs.length - 1 : prev - 1
                  )
                }
              >
                <FaStepBackward />
              </button>

              <button onClick={() => setPlaying(!playing)}>
                {playing ? <FaPause /> : <FaPlay />}
              </button>

              <button
                onClick={() =>
                  setCurrent(prev =>
                    (prev + 1) % songs.length
                  )
                }
              >
                <FaStepForward />
              </button>

            </div>

            {/* ===== SEEK BAR ===== */}
            <div className="seek-bar">
              <span>{formatTime(currentTime)}</span>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const time = Number(e.target.value);
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                  setCurrentTime(time);
                }}
              />

              <span>{formatTime(duration)}</span>
            </div>
          </div></div></div>

     
      <div className="language-sections-details">

        {["Telugu", "Hindi", "English", "Tamil", "Kannada"].map(lang => {

          const langSongs = songs.filter(s => s.language === lang);
          if (!langSongs.length) return null;

          return (
            <div key={lang} className="language-block-details">

              <h3>{lang}</h3>

              <div className="language-row-details">
                {langSongs.map((s) => {
                  const index = songs.findIndex(song => song._id === s._id);

                  return (
                    <div
                      key={s._id}
                      className={`lang-mini-card ${index === current ? "active" : ""
                        }`}
                      onClick={() => {
                        setCurrent(index);
                        setPlaying(true);
                      }}
                    >
                      <img
                        src={`http://localhost:5000${s.coverUrl}`}
                        alt={s.title}
                      />
                      <p>{s.title}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}

      </div>


    </div>
  );
}

function formatTime(time) {
  if (!time) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
