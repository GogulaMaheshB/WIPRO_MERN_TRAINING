import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylists, createPlaylist } from "../api/playlist.api";
import "../styles/Playlists.css";
import {
  FaMusic
} from "react-icons/fa";

export default function Playlists() {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      navigate("/");
      return;
    }

    getPlaylists()
      .then(data => {
        if (Array.isArray(data)) {
          setLists(data);
        } else if (Array.isArray(data.playlists)) {
          setLists(data.playlists);
        } else {
          setLists([]);
        }
      })
      .catch(err => {
        console.error("Playlist fetch failed", err);
        setLists([]);
      });
  }, [navigate]);

  const create = async () => {
    if (!name.trim()) return;
    await createPlaylist(name);
    setName("");
    getPlaylists().then(setLists);
  };

  return (
    <div className="playlists-page">
      <h2 className="page-title"><FaMusic /> My Playlists</h2>

      {/* CREATE PLAYLIST */}
      <div className="create-playlist">
        <input
          placeholder="Enter playlist name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={create}>Create</button>
      </div>

      {/* PLAYLIST LIST */}
      <div className="playlist-grid">
        {lists.length === 0 && (
          <p className="empty-text">No playlists yet</p>
        )}

        {Array.isArray(lists) && lists.map(p => (
          <div
            key={p._id}
            className="playlist-card"
          >
            {/* CLICK TO OPEN */}
            <div onClick={() => navigate(`/playlists/${p._id}`)}>
              <h3>{p.name}</h3>
              <p>{p.songs?.length || 0} Songs</p>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>

              {/* UPDATE */}
              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  const newName = prompt("Enter new playlist name", p.name);
                  if (!newName || !newName.trim()) return;

                  await fetch(`http://localhost:5000/api/playlists/${p._id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token")
                    },
                    body: JSON.stringify({ name: newName })
                  });

                  setLists(prev =>
                    prev.map(x =>
                      x._id === p._id ? { ...x, name: newName } : x
                    )
                  );
                }}
              >
                 Edit
              </button>

              {/* DELETE */}
              <button
                onClick={async e => {
                  e.stopPropagation();
                  await fetch(`http://localhost:5000/api/playlists/${p._id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: localStorage.getItem("token")
                    }
                  });
                  setLists(prev => prev.filter(x => x._id !== p._id));
                }}
              >
                 Delete
              </button>

            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
