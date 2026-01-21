function About() {
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
          About Us
        </h3>

        <p className="text-center">
          This is a simple React application using Routing and Bootstrap.
        </p>

        <p className="text-center">
          It demonstrates Login, About, and Contact pages with clean UI.
        </p>
      </div>
    </div>
  );
}

export default About;
