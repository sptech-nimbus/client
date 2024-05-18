import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import user from '@api/user'
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [userId, setUserId] = useState(localStorage.getItem('id') || null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      if(token) { 
         localStorage.setItem('token', token);
         setIsAuthenticated(true);
      }
      else localStorage.removeItem('token');
   }, [token]);

   const login = async (credentials) => {
      try {
         const response = await user.login(credentials);
         const { token, id } = response.data.data;
         // const response = await axios.get('https://6642243c3d66a67b34366411.mockapi.io/nimbus/login/1');
         // const { token, id } = response.data;
         console.log('token: '+token)
         console.log('id: '+id)
         setToken(token);
         setUserId(id);
         setIsAuthenticated(true);
      }
      catch(err) {
         setIsAuthenticated(false);
         throw err;
      }
   }

   const logout = () => {
      setToken(null);
      setUserId(null);
   }

   return (
      <AuthContext.Provider value={{token, userId, isAuthenticated, login, logout}}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   return useContext(AuthContext);
}

