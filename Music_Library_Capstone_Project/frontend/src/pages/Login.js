import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth.api";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("username", res.user.name || "User");
      //not allow if admin already login
      if (res.user.role === "admin") {

        const existingAdminTab = localStorage.getItem("adminActive");

        if (existingAdminTab) {
          alert("Admin account already in use in another tab");
          return;
        }

        const tabId = Date.now().toString();
        localStorage.setItem("adminActive", tabId);

        navigate("/admin/dashboard");
      }
      else {
        navigate("/");
      }

    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-hero hero-carousel">

      <div className="carousel-bg">
        <img src="/images/bg1.jpg" alt="bg1" />
        <img src="/images/bg2.jpg" alt="bg2" />
        <img src="/images/bg3.jpg" alt="bg3" />
      </div>

      <div className="hero-overlay"></div>

      <div className="auth-card-wrapper">
        <div className="auth-card">
          <h2>Login</h2>

          <form onSubmit={submit}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="auth-btn">
              LOGIN
            </button>
          </form>

          <p className="auth-footer">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

    </div>
  );

}
