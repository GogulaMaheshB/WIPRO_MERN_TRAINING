const express = require("express");
const cors = require("cors");

const errorHandling =require("./middleware/errorHandling");
const app = express();

app.use(cors());
app.use(express.json());

//course list which is stored in server 
let courses = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js"},
  {id: 3, name:"mongoDB"},
  {id:4,name:"javascript"}
];


//which is used to get the all courses
app.get("/courses", (req, res) => {
  res.json(courses);
});



//which is used to add the course
app.post("/courses", (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Course name required" });
    }
    const newCourse = {
      id: Date.now(),
      name
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



//which is used to delete the course
app.delete("/courses/:id", (req, res) => {
  try {
    const id = (req.params.id);

    courses = courses.filter(course =>course && course.id !== id);

    res.json({ message: "Course deleted" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


//Error middleware which is used for error handling
app.use(errorHandling);

//here server run on port 5000 and frontend code run on port 3000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});