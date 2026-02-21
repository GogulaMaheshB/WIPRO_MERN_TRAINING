const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/role.middleware");
const songController = require("../controllers/song.controller");
const upload = require("../config/multer");


// user
router.get("/", songController.getSongs);
router.get("/search", songController.searchSong);
router.get("/:id", songController.getSongById);
router.get("/admin/all", auth, isAdmin, songController.getAllSongsAdmin);

// admin

router.put("/:id", auth, isAdmin, songController.updateSong);
router.delete("/:id", auth, isAdmin, songController.deleteSong);
router.put("/:id/visibility", auth, isAdmin, songController.toggleVisibility);



router.post(
  "/upload",
  auth,
  isAdmin,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  songController.uploadSong
);

module.exports = router;
