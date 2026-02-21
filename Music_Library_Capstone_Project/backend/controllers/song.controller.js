const Song = require("../models/song.model");

const mongoose = require("mongoose");

/**
 * USER: Get all visible songs
 */
exports.getSongs = async (req, res) => {
  const songs = await Song.find({ isVisible: true });
  res.json(songs);
};
//USER: get song by id

exports.getSongById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid song ID" });
  }

  const song = await Song.findById(req.params.id);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  res.json(song);
};


/**
 * ADMIN: Update Song
 */
exports.updateSong = async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(song);
};

/**
 * ADMIN: Delete Song
 */
exports.deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Song deleted" });
};

/**
 * ADMIN: Hide / Show Song
 */
exports.toggleVisibility = async (req, res) => {
  const song = await Song.findById(req.params.id);
  song.isVisible = !song.isVisible;
  await song.save();
  res.json(song);
};

/**
 * USER: Search Song
 */
exports.searchSong = async (req, res) => {
  const keyword = req.query.q;
  const songs = await Song.find({
    isVisible: true,
    $or: [
      { title: new RegExp(keyword, "i") },
      { artist: new RegExp(keyword, "i") },
      { album: new RegExp(keyword, "i") },
      { musicDirector: new RegExp(keyword, "i") }
    ]
  });
  res.json(songs);
};
// ADMIN: Get all songs (visible + hidden)
exports.getAllSongsAdmin = async (req, res) => {
  const songs = await Song.find(); // no filter
  res.json(songs);
};


// admin add
exports.uploadSong = async (req, res) => {
  try {
    if (!req.files || !req.files.cover || !req.files.audio) {
      return res.status(400).json({
        message: "Cover image and audio file are required"
      });
    }

    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      musicDirector: req.body.musicDirector,
      album: req.body.album,
      releaseDate: req.body.releaseDate,
      language: req.body.language,
      coverUrl: `/uploads/images/${req.files.cover[0].filename}`,
      audioUrl: `/uploads/songs/${req.files.audio[0].filename}`,
      isVisible: true
    });
    const io = req.app.get("io");

    io.emit("new-song", {
      message: `${song.language} New song added: ${song.title}`,
      language: song.language,
      title: song.title
    });

    res.status(201).json(song);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
