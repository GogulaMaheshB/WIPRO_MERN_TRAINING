import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #8B0000, #C0392B, #F39C12)",
        padding: "12px 0",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <h4 className="text-white fw-bold m-0">
          ReactPortal
        </h4>

        <div className="d-flex gap-4">
          <NavLink to="/login" className="text-white fw-semibold text-decoration-none">
            Login
          </NavLink>
          <NavLink to="/about" className="text-white fw-semibold text-decoration-none">
            About
          </NavLink>
          <NavLink to="/contact" className="text-white fw-semibold text-decoration-none">
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
