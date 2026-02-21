require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const programRoutes = require("./routes/programRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

app.use("/api/programs", programRoutes);
app.use("/api/enroll", enrollmentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;