const Playlist = require("../models/playlist.model");

/**
 * CREATE PLAYLIST
 */
exports.createPlaylist = async (req, res) => {
  const playlist = await Playlist.create({
    name: req.body.name,
    userId: req.user.id,
    songs: []
  });

  res.status(201).json(playlist);
};

/**
 * GET ALL PLAYLISTS OF LOGGED-IN USER
 */
exports.getUserPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ userId: req.user.id });
  res.json(playlists);
};
exports.getPlaylistById = async (req, res) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    userId: req.user.id
  }).populate("songs");   

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  res.json(playlist);
};


/**
 * ADD SONG TO PLAYLIST
 */
exports.addSongToPlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  if (!playlist.songs.includes(req.body.songId)) {
    playlist.songs.push(req.body.songId);
    await playlist.save();
  }

  res.json(playlist);
};

/**
 * REMOVE SONG FROM PLAYLIST
 */
exports.removeSongFromPlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  playlist.songs = playlist.songs.filter(
    songId => songId.toString() !== req.body.songId
  );

  await playlist.save();
  res.json(playlist);
};

/**
 * DELETE PLAYLIST
 */
exports.deletePlaylist = async (req, res) => {
  await Playlist.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json({ message: "Playlist deleted" });
};
// Update PlayList
exports.updatePlaylist= async(res,req)=>{
  const updated = await Playlist.findByIdAndUpdate(
    req.params.id,
    {name:req.body.name},
    {new:true}
  );
  res.json(updated);
};