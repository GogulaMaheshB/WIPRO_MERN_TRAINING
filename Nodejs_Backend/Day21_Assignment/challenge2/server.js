const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect("mongodb://127.0.0.1:27017/day21db")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);


app.post("/register", async (req, res) => {
  const { name, email } = req.body;


  if (!name || !email) {
    return res.status(400).send("Name and Email required");
  }

  const newUser = new User({ name, email });
  await newUser.save();

  console.log("User saved:", name);
  res.send(`Registration successful for ${name}`);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
