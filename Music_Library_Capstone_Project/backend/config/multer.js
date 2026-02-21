const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/others";

    if (file.fieldname === "cover") {
      folder = "uploads/images";
    }
    if (file.fieldname === "audio") {
      folder = "uploads/songs";
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
     const ext = path.extname(file.originalname);
    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_"); 

    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
