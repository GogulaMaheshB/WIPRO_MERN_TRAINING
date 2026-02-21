import React, { useEffect, useState } from "react";
import "./ProgramList.css";

const ProgramList = () => {

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);

  const userId = "USR101";

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/programs");
        const data = await response.json();

        if (response.ok) {
          setPrograms(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Server error while fetching programs");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleEnroll = async (programId) => {

    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          programId: programId
        })
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage("Enrollment successful");
        setEnrolledPrograms((prev) => [...prev, programId]);
      } else if (response.status === 400) {
        setMessage("Already enrolled");
      } else {
        setMessage(data.message || "Server error");
      }

    } catch (err) {
      setMessage("API or server error");
    }
  };

  if (loading) {
    return <h2 className="center">Loading programs...</h2>;
  }

  if (error) {
    return <h2 className="error center">{error}</h2>;
  }

  return (
    <div className="container">

      <h1 className="title">FitTrack Programs</h1>

      {message && <div className="message">{message}</div>}

      <div className="card-wrapper">
        {programs.map((program) => (
          <div className="card" key={program._id}>
            <h3>{program.name}</h3>
            <p>Category: {program.category}</p>
            <p>Level: {program.level}</p>
            <p>Price: ₹{program.price}</p>

            <button
              disabled={enrolledPrograms.includes(program.programId)}
              onClick={() => handleEnroll(program.programId)}
            >
              {enrolledPrograms.includes(program.programId)
                ? "Enrolled"
                : "Enroll"}
            </button>
          </div>
        ))}
      </div>

      <div className="enrolled-section">
        <h2>My Enrolled Programs</h2>

        {enrolledPrograms.length === 0 ? (
          <p>No enrollments yet</p>
        ) : (
          <ul>
            {enrolledPrograms.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default ProgramList;