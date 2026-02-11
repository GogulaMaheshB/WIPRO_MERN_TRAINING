import { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "./FetchAPI";
import Button from "./Button";

function Display_Course_List() {
  const [courses, setCourses] = useState([]);//it is used to store the list of courses and update the list
  const [error, setError] = useState("");//it is used to store error message if api fails

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const data = await getCourses();//here we are fetching getCourse from FetchAPI
      setCourses(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCourse(id);//here we are fetching deleteCourse from FetchAPI
      setCourses(courses.filter(course =>course && course.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name}
            <br/>
            <br/>
            <Button style="bg-color:red;"
              text="Delete"
              onClick={() => handleDelete(course.id)}
            />
            <br/>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Display_Course_List;
