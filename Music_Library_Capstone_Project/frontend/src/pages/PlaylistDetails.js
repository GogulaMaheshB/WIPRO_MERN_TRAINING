import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PlaylistDetails.css";
import { usePlayer } from "../context/PlayerContext";
import {
  FaPlay,
  FaStop,
  FaRandom,
  FaRedo,
  FaTimes
} from "react-icons/fa";

export default function PlaylistDetails() {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    songs,
    current,
    setSongs: setPlayerSongs,
    setCurrent: setPlayerCurrent,
    setPlaying,
    shuffle,
    setShuffle,
    repeat,
    setRepeat
  } = usePlayer();

  /* FETCH PLAYLIST  */
  useEffect(() => {
    fetch(`http://localhost:5000/api/playlists/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setPlaylist(data);
        setPlaylistSongs(data.songs || []);
      });
  }, [id]);

  /*  FETCH ALL SONGS  */
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then(res => res.json())
      .then(setAllSongs);
  }, []);

  if (!playlist) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  /*  SEARCH FILTER */
  const filteredSongs = playlistSongs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const languages = ["Telugu", "Hindi", "English", "Tamil", "Kannada"];

  return (
    <div className="playlist-details-page">

      <h2>{playlist.name}</h2>

      {/*  PLAY CONTROLS */}
      {playlistSongs.length > 0 && (
        <div className="playlist-controls">

          <button
            onClick={() => {
              setPlayerSongs(playlistSongs);
              setPlayerCurrent(0);
              setPlaying(true);
            }}
          >
            <FaPlay /> Play
          </button>

          <button onClick={() => setPlaying(false)}>
            <FaStop /> Stop
          </button>

          <button
            onClick={() => setShuffle(!shuffle)}
            className={shuffle ? "active-btn" : ""}
          >
            <FaRandom /> Shuffle
          </button>

          <button
            onClick={() => setRepeat(!repeat)}
            className={repeat ? "active-btn" : ""}
          >
            <FaRedo /> Repeat
          </button>

        </div>
      )}

      
      <select
        className="add-song-select"
        onChange={async e => {
          const songId = e.target.value;
          if (!songId) return;

          await fetch(
            `http://localhost:5000/api/playlists/${id}/add-song`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
              },
              body: JSON.stringify({ songId })
            }
          );

          const res = await fetch(
            `http://localhost:5000/api/playlists/${id}`,
            {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }
          );

          const updated = await res.json();
          setPlaylistSongs(updated.songs || []);
        }}
      >
        <option value="">Add song to playlist</option>

        {languages.map(lang => {

          const langSongs = allSongs.filter(
            song =>
              song.language === lang &&
              !playlistSongs.some(p => p._id === song._id) // prevent duplicate
          );

          if (!langSongs.length) return null;

          return (
            <optgroup key={lang} label={lang}>
              {langSongs.map(song => (
                <option key={song._id} value={song._id}>
                  {song.title}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>

      {/*  SEARCH  */}
      <input
        type="text"
        placeholder="Search song in this playlist..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="playlist-search"
      />

     
      {filteredSongs.length === 0 ? (
        <p className="empty">No songs in this playlist</p>
      ) : (
        languages.map(lang => {

          const langSongs = filteredSongs.filter(
            song => song.language === lang
          );

          if (!langSongs.length) return null;

          return (
            <div key={lang} className="playlist-language-block">

              <h3>{lang}</h3>

              <div className="song-list">
                {langSongs.map((song) => {
                  const index = playlistSongs.findIndex(
                    s => s._id === song._id
                  );

                  return (
                    <div
                      key={song._id}
                      className={`song-row ${
                        songs[current]?._id === song._id ? "active" : ""
                      }`}
                      onClick={() => {
                        setPlayerSongs(playlistSongs);
                        setPlayerCurrent(index);
                        setPlaying(true);
                      }}
                    >
                      <img
                        src={`http://localhost:5000${song.coverUrl}`}
                        alt={song.title}
                      />

                      <div>
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                      </div>

                      {/* REMOVE SONG */}
                      <button
                        className="remove-btn"
                        onClick={async e => {
                          e.stopPropagation();

                          await fetch(
                            `http://localhost:5000/api/playlists/${id}/remove-song`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: localStorage.getItem("token")
                              },
                              body: JSON.stringify({ songId: song._id })
                            }
                          );

                          setPlaylistSongs(prev =>
                            prev.filter(s => s._id !== song._id)
                          );
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })
      )}

    </div>
  );
}
