const API = "http://localhost:5000/api";

export const getSongs = async () => {
  const res = await fetch(`${API}/songs`);
  return res.json();
};

export const searchSongs = async (q) => {
  const res = await fetch(`${API}/songs/search?q=${q}`);
  return res.json();
};
