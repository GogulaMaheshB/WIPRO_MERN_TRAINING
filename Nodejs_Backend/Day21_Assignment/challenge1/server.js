const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.post("/register", (req, res) => {
  const { name } = req.body;

  res.send(`Registration successful for ${name}`);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
