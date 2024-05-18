import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();

   return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;