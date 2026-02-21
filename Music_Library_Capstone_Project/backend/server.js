const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

//ROUTES
app.get("/", (req, res) => {
  res.send("Music Library API Running");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/songs", require("./routes/song.routes"));
app.use("/api/playlists", require("./routes/playlist.routes"));

//SOCKET.IO


let server;

if (process.env.NODE_ENV !== "test") {
  server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

 
module.exports = app;
