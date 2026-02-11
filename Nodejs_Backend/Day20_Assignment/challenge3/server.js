import express from "express";

const app = express();

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/courses", (req, res) => {
  const courses = [
    { title: "JavaScript Basics", duration: "4 weeks" },
    { title: "Node.js & Express", duration: "6 weeks" },
    { title: "React Fundamentals", duration: "5 weeks" }
  ];

  res.render("courses", { courses });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
