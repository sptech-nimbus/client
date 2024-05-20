import { Navigate } from "react-router-dom";
import { useAuth } from "@contexts/auth.jsx";

const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();
   return isAuthenticated || localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;