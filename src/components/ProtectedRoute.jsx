import { Navigate } from "react-router-dom";
import { getDecryptedRefreshToken } from "../util/tokenUtil";

export default function ProtectedRoute({ children }) {
  const token = getDecryptedRefreshToken();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
