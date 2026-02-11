import express from "express";
import logger from "./middleware/logger.js";

const app = express();

// Global middleware
app.use(logger);

app.get("/courses", (req, res) => {
  res.send("Courses list");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
