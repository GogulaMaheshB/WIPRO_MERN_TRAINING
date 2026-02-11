import { useState } from "react";
import Display_Course_List from "./components/Display_Course_List";
import { addCourse } from "./components/FetchAPI";
import Button from "./components/Button";
import "./App.css";


function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleAddCourse() {
    try {
      await addCourse(name);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Online Course Tracker</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter course name"
      />

      <Button text="Add Course" onClick={handleAddCourse} />

      <Display_Course_List />
    </div>
  );
}

export default App;
