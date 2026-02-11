const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const path = require("path");

const User = require("./models/User");
const auth = require("./middleware/auth");
const authorizeAdmin = require("./middleware/authorizeAdmin");

const app = express();

app.use(express.json());

app.use(session({
  secret: "jwt_session_secret",
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://127.0.0.1:27017/activity6DB")
  .then(() => console.log("MongoDB Connected"));

const products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 25000, category: "Electronics" },
  { id: 3, name: "Chair", price: 3000, category: "Furniture" }
];

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
    role: role || "user"
  });

  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "jwt_secret_key",
    { expiresIn: "1h" }
  );

  req.session.token = token;

  res.json({ message: "Login successful", token });
});

app.get("/admin", auth, authorizeAdmin, (req, res) => {
  res.render("admin", { products });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
