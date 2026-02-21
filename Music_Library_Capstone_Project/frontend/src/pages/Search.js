import { useEffect, useState } from "react";
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import {FaPlay } from "react-icons/fa";

export default function Search() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const { setSongs: setPlayerSongs, setCurrent, setPlaying } = usePlayer();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then(res => res.json())
      .then(data => setSongs(data));
  }, []);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase()) ||
    song.musicDirector.toLowerCase().includes(query.toLowerCase()) ||
    song.album.toLowerCase().includes(query.toLowerCase())
  );

  const playSong = (song) => {
    if (!token) {
      navigate("/login");
      return;
    }

    setPlayerSongs(filteredSongs);
    const index = filteredSongs.findIndex(s => s._id === song._id);
    setCurrent(index);
    setPlaying(true);
  };

  return (
    <div className="search-page">
      <div className="search-header">
      <h2>Search Songs</h2>

      <input 
        type="text"
        placeholder="Search by song, artist, album, music director..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      </div>

      <div className="search-results">
        {filteredSongs.length === 0 && query && (
          <p className="no-results">No songs found</p>
        )}

        {filteredSongs.map(song => (
          <div key={song._id} className="search-card">
            <img
              src={`http://localhost:5000${song.coverUrl}`}
              alt={song.title}
              onClick={() => navigate(`/songs/${song._id}`)}
            />

            <div className="search-info">
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
              <span>{song.album}</span>
            </div>

            <button onClick={() => playSong(song)}><FaPlay /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
