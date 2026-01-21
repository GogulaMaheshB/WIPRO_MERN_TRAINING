import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Message sent successfully");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, red, orange, yellow)",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-3" style={{ color: "red" }}>
          Contact Us
        </h3>

        {message && (
          <div className="alert alert-success text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control"></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "orange",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
