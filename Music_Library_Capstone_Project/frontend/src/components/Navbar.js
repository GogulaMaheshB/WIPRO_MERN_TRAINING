import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Socket from "../pages/Socket.js";
import { usePlayer } from "../context/PlayerContext";
import {
  FaHome,
  FaSearch,
  FaMusic,
  FaUserCog,
  FaBars,
  FaTimes,
  FaBell
} from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username") || "User";

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { setSongs, setPlaying, setCurrent } = usePlayer();

  const logout = () => {
    setPlaying(false);
    setSongs([]);
    setCurrent(0);
    
    if (localStorage.getItem("role") === "admin") {
      localStorage.removeItem("adminActive");
    }

    localStorage.clear();
    navigate("/login");
  };

  /* SOCKET LISTENER */
  useEffect(() => {
    if (role !== "user") return;

    Socket.on("new-song", (data) => {
      setNotifications(prev => [{
        message: data.message,
        language: data.language,
        title: data.title
      }, ...prev]);
    });

    return () => {
      Socket.off("new-song");
    };
  }, [role]);

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <img
          src="/images/maahi-logo.png"
          alt="Maahi Music Logo"
          className="nav-logo"
        />
        <span className="logo-text">Maahi Music</span>
      </div>

      {/* HAMBURGER */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* LINKS */}
      <div className={`nav-links ${open ? "open" : ""}`}>

        <Link to="/" onClick={() => setOpen(false)}>
          <FaHome /> Home
        </Link>

        <Link to="/search" onClick={() => setOpen(false)}>
          <FaSearch /> Search
        </Link>

        {token && role === "user" && (
          <Link to="/playlists" onClick={() => setOpen(false)}>
            <FaMusic /> My Playlists
          </Link>
        )}

        {token && role === "admin" && (
          <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
            <FaUserCog /> Dashboard
          </Link>
        )}

        {/*  NOTIFICATION BELL (ONLY USER) */}
        {token && role === "user" && (
          <div className="notification-container">

            <FaBell
              className="bell-icon"
              onClick={() => {
                setShowDropdown(!showDropdown);


                if (showDropdown) {
                  setNotifications([]);
                }
              }}
            />

            {notifications.length > 0 && (
              <span className="badge">
                {notifications.length}
              </span>
            )}

            {showDropdown && (
              <div className="notification-dropdown">
                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications.map((note, index) => (
                    <div key={index} className="notification-item">
                      <strong>{note.language}</strong><br />
                      {note.title}
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}


        {!token ? (
          <div className="auth-buttons">
            <Link to="/login" className="nav-btn" onClick={() => setOpen(false)}>
              Login
            </Link>

            <Link to="/register" className="nav-btn outline" onClick={() => setOpen(false)}>
              Register
            </Link>
          </div>
        ) : (
          <>
            <span className="user">Hello, {username}</span>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
