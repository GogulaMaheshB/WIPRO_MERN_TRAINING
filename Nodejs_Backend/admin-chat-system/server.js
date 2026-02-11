const express = require("express");
const http = require("http");
const multer = require("multer");
const { Server } = require("socket.io");

const authAdmin = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post(
  "/admin/upload",
  upload.single("file"),
  authAdmin,
  rateLimiter,
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    io.to("users").emit("broadcast", {
      type: "file",
      name: req.file.filename
    });

    res.json({ message: "File uploaded & sent to users" });
  }
);


io.on("connection", socket => {
  const role = socket.handshake.auth.role;

  if (role === "user") {
    socket.join("users");
  }

  if (role === "admin") {
    socket.on("sendMessage", msg => {
      socket.broadcast.to("users").emit("broadcast", {
        type: "message",
        text: msg
      });
    });
  }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
