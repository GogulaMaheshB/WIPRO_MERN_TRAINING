import express from "express";

const app = express();

// Built-in body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/users", (req, res) => {
  const userData = req.body;

  res.status(201).json({
    message: "User created successfully",
    data: userData
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
