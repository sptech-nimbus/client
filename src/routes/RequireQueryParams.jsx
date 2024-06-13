import { Navigate, useLocation } from "react-router-dom";

const useQuery = () => {
   return new URLSearchParams(useLocation().search);
}

export default function RequireQueryParams({ children }) {
   const query = useQuery();
   if(!Array.from(query).length) {
      return <Navigate to="/not-found" />
   }

   return children;
}