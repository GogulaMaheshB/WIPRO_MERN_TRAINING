import { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {

  const [form, setForm] = useState({
    title: "",
    artist: "",
    musicDirector: "",
    album: "",
    releaseDate: "",
    language: ""
  });

  const [songs, setSongs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  useEffect(() => {
  const handleUnload = () => {
    localStorage.removeItem("adminActive");
  };

  window.addEventListener("beforeunload", handleUnload);

  return () => {
    window.removeEventListener("beforeunload", handleUnload);
  };
}, []);


  /*  FETCH ALL SONGS  */
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
    fetch("http://localhost:5000/api/songs/admin/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setSongs);
  };

  /* SUBMIT  */
  const submit = async (e) => {
    e.preventDefault();

    if (editingId) {
      /* UPDATE SONG*/
      const data = new FormData();
      Object.keys(form).forEach(key => data.append(key, form[key]));

      if (e.target.cover.files[0]) {
        data.append("cover", e.target.cover.files[0]);
      }

      if (e.target.audio.files[0]) {
        data.append("audio", e.target.audio.files[0]);
      }

      await fetch(`http://localhost:5000/api/songs/${editingId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: data
      });

      alert("Song Updated Successfully");
      setEditingId(null);

    } else {
      // UPLOAD NEW SONG
      const data = new FormData();
      Object.keys(form).forEach(key => data.append(key, form[key]));
      data.append("cover", e.target.cover.files[0]);
      data.append("audio", e.target.audio.files[0]);

      await fetch("http://localhost:5000/api/songs/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: data
      });

      alert("Song Uploaded Successfully");
    }

    setForm({
      title: "",
      artist: "",
      musicDirector: "",
      album: "",
      releaseDate: "",
      language: ""
    });

    setCoverPreview(null);
    e.target.reset();
    fetchSongs();
  };

  /*  DELETE  */
  const deleteSong = async (id) => {
    await fetch(`http://localhost:5000/api/songs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    fetchSongs();
  };

  /*  TOGGLE VISIBILITY  */
  const toggleVisibility = async (id) => {
    await fetch(`http://localhost:5000/api/songs/${id}/visibility`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    fetchSongs();
  };

  return (
    <div className="admin-page">
      <div className="admin-container">

        <h2 className="admin-title">Admin Dashboard</h2>

        {/*  FORM */}
        <form
          className="admin-form"
          onSubmit={submit}
          encType="multipart/form-data"
        >

          <div className="form-row">
            <input
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              placeholder="Artist"
              value={form.artist}
              onChange={e => setForm({ ...form, artist: e.target.value })}
              required
            />
            <input
              placeholder="Music Director"
              value={form.musicDirector}
              onChange={e => setForm({ ...form, musicDirector: e.target.value })}
              required
            />
            <input
              placeholder="Album"
              value={form.album}
              onChange={e => setForm({ ...form, album: e.target.value })}
              required
            />
            <input
              type="date"
              className="date-input"
              value={form.releaseDate}
              onChange={(e) =>
                setForm({ ...form, releaseDate: e.target.value })
              }
              required
            />

            <select
              value={form.language}
              onChange={e => setForm({ ...form, language: e.target.value })}
              required
            >
              <option value="">Select Language</option>
              <option>Telugu</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </select>
          </div>

          {editingId && (
            <div className="upload-section">
              <h4>Current Cover</h4>
              <img
                src={`http://localhost:5000${songs.find(s => s._id === editingId)?.coverUrl
                  }`}
                alt="Current Cover"
                className="cover-preview"
              />
            </div>
          )}

          {/* COVER INPUT */}
          <div className="upload-section">
            <h4>{editingId ? "Change Cover (Optional)" : "Cover Image"}</h4>
            <input
              type="file"
              name="cover"
              accept="image/*"
              required={!editingId}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setCoverPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {coverPreview && (
              <img src={coverPreview} alt="Preview" className="cover-preview" />
            )}
          </div>

          {/* AUDIO INPUT */}
          <div className="upload-section">
            <h4>{editingId ? "Change Audio (Optional)" : "Audio Song"}</h4>
            <input
              type="file"
              name="audio"
              accept="audio/*"
              required={!editingId}
            />
          </div>

          <button className="upload-btn">
            {editingId ? "UPDATE SONG" : "UPLOAD SONG"}
          </button>
        </form>

       
        <h3 style={{ marginTop: "40px", color: "#facc15" }}>
          Manage Songs
        </h3>

        <div className="admin-song-list">
          {songs.map(song => (
            <div key={song._id} className="admin-song-card">

              <img
                src={`http://localhost:5000${song.coverUrl}`}
                alt={song.title}
              />

              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
                <p>Status: {song.isVisible ? "Visible" : "Hidden"}</p>
              </div>

              <div className="admin-actions">

                <button
                  onClick={() => {
                    setEditingId(song._id);
                    setForm({
                      title: song.title,
                      artist: song.artist,
                      musicDirector: song.musicDirector,
                      album: song.album,
                      releaseDate: song.releaseDate?.split("T")[0],
                      language: song.language
                    });
                  }}
                >
                  Edit
                </button>

                <button onClick={() => deleteSong(song._id)}>
                  Delete
                </button>

                <button onClick={() => toggleVisibility(song._id)}>
                  {song.isVisible ? "Hide" : "Show"}
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
