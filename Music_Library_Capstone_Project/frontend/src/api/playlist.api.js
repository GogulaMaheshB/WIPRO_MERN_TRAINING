const API = "http://localhost:5000/api";

export const getPlaylists = async () => {
  const res = await fetch(`${API}/playlists`, {
    headers: { Authorization: localStorage.getItem("token") }
  });
  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const createPlaylist = async (name) => {
  const res = await fetch(`${API}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({ name })
  });
  return res.json();
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const res = await fetch(`${API}/playlists/${playlistId}/add-song`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({ songId })
  });
  return res.json();
};
