const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const playlistController = require("../controllers/playlist.controller");

// create playlist
router.post("/", auth, playlistController.createPlaylist);

// get user playlists
router.get("/", auth, playlistController.getUserPlaylists);
//update playlist
router.put("/:id",auth,playlistController.updatePlaylist)

// get single playlist with songs
router.get("/:id", auth, playlistController.getPlaylistById);


// add song to playlist
router.put("/:id/add-song", auth, playlistController.addSongToPlaylist);

// remove song from playlist
router.put("/:id/remove-song", auth, playlistController.removeSongFromPlaylist);

// delete playlist
router.delete("/:id", auth, playlistController.deletePlaylist);


module.exports = router;
