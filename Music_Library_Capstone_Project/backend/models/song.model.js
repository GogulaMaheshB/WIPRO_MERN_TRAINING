const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  musicDirector: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date
  },
  language: {
    type: String,
    enum: ["Telugu", "English", "Hindi", "Tamil",  "Kannada"],
    required: true
  }
  ,
  coverUrl: {
    type: String
  },
  audioUrl: {
    type: String
  },
  isVisible: {
    type: Boolean,
    default: true   // admin can hide song
  }
}, { timestamps: true });

module.exports = mongoose.model("Song", songSchema);
