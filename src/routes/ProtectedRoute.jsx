import { Navigate } from "react-router-dom";
import { useAuth } from "@contexts/auth.jsx";

const ProtectedRoute = ({ children, requireTeam }) => {
   const { isAuthenticated } = useAuth();
   if(requireTeam) {
      return isAuthenticated || (localStorage.getItem('token') && sessionStorage.getItem('teamId')) ? children : <Navigate to="/my-teams" />;
   }
   return isAuthenticated || localStorage.getItem('token') ? children : <Navigate to="/login" />;
   
}

export default ProtectedRoute;