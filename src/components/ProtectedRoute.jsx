import { Navigate } from "react-router-dom";
import { hasAuthToken } from "../util/tokenUtil";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = hasAuthToken();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
