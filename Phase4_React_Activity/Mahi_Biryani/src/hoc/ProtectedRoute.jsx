import { Navigate } from "react-router-dom";
import AuthStore from "../stores/authStore";

function ProtectedRoute({ children }) {
  return AuthStore.isAuthenticated()
    ? children
    : <Navigate to="/admin-login" replace />;//replace prevents browser history abuse
}

export default ProtectedRoute;
