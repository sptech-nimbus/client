import { Navigate } from "react-router-dom";

export default function CoachRoute({ children }) {
   if (localStorage.getItem('type') && localStorage.getItem('type') === "Coach") {
      return children;
   }
   return <Navigate to="/dashboard" />;
}