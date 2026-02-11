const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "sessionsecret",
  resave: false,
  saveUninitialized: false
}));


mongoose.connect("mongodb://127.0.0.1:27017/day21db")
  .then(() => console.log("MongoDB Connected"));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model("User", userSchema);



app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.send("All fields required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user"
  });

  res.send(`Registration successful for ${name}`);
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");


  req.session.user = {
    id: user._id,
    role: user.role
  };

  res.send("Login successful");
});


function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
}



app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome, Admin!");
});


app.listen(5000, () => {
  console.log("Server running on port 3000");
});
