import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  return localStorage.getItem("admin")
    ? children
    : <Navigate to="/admin-login" />;
}

export default ProtectedRoute;
