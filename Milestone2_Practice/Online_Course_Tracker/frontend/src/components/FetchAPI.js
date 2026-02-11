const BASE_URL = "http://localhost:5000/courses";

// to get the course list from the backend server 
export async function getCourses() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch courses");
  return response.json();
}

// here which is used to add the course
export async function addCourse(name) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  if (!response.ok) throw new Error("Failed to add course");
}

// which is used to delete the course
export async function deleteCourse(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("Failed to delete course");
}
