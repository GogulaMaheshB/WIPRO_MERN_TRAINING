import { Navigate } from "react-router-dom";
import AuthStore from "../stores/authStore";

function ProtectedRoute({ children }) {
  return AuthStore.isAuthenticated()
    ? children
    : <Navigate to="/admin-login" />;
}

export default ProtectedRoute;
