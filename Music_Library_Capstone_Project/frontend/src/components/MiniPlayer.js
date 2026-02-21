import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import "../styles/MiniPlayer.css";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaTimes,
  FaRandom,
  FaRedo
} from "react-icons/fa";

export default function MiniPlayer() {

  const navigate = useNavigate();
  const miniRef = useRef(null);

  const {
    audioRef,
    songs,
    current,
    setSongs,
    setCurrent,
    playing,
    setPlaying,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    playNext,
    playPrev,
    handleSongEnd
  } = usePlayer();

  /* AUDIO CONTROL */
  useEffect(() => {
    if (!audioRef.current || !songs.length) return;

    playing
      ? audioRef.current.play().catch(() => {})
      : audioRef.current.pause();
  }, [playing, current, songs, audioRef]);

  /* DRAG LOGIC */

  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 210,
    y: window.innerHeight - 120
  });

  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
   
    if (e.target.closest("button")) return;

    setIsDragging(true);

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const token = localStorage.getItem("token");
  if (!songs.length || !token) return null;

  const song = songs[current];

  return (
    <div
      ref={miniRef}
      className="mini-player"
      style={{
        left: position.x,
        top: position.y,
        position: "fixed"
      }}
      onMouseDown={handleMouseDown}
      onClick={() => {
        if (song?._id) {
          navigate(`/songs/${song._id}`);
        }
      }}
    >

      {/* LEFT INFO */}
      <div className="mini-info">
        <img
          src={`http://localhost:5000${song.coverUrl}`}
          alt={song.title}
        />
        <div className="mini-info-text">
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>
      </div>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={`http://localhost:5000${song.audioUrl}`}
        onEnded={handleSongEnd}
      />

      {/* CONTROLS */}
      <div className="mini-controls">

        <button onClick={(e) => { e.stopPropagation(); playPrev(); }}>
          <FaStepBackward />
        </button>

        <button onClick={(e) => {
          e.stopPropagation();
          setPlaying(!playing);
        }}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>

        <button onClick={(e) => { e.stopPropagation(); playNext(); }}>
          <FaStepForward />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShuffle(!shuffle);
          }}
          className={shuffle ? "active-mini" : ""}
        >
          <FaRandom />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setRepeat(!repeat);
          }}
          className={repeat ? "active-mini" : ""}
        >
          <FaRedo />
        </button>

        <button
          className="remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            setPlaying(false);
            setSongs([]);
            setCurrent(0);
            navigate("/");
          }}
        >
          <FaTimes />
        </button>

      </div>
    </div>
  );
}
