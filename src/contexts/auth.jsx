import { createContext, useContext, useState, useEffect } from "react";
import user from '@api/user'
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [userId, setUserId] = useState(localStorage.getItem('id') || null);
   const [teamId, setTeamId] = useState(localStorage.getItem('teamId') || null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('id');
      const storedTeamId = localStorage.getItem('teamId');
      
      if (storedToken && storedUserId) {
         setToken(storedToken);
         setUserId(storedUserId);
         setTeamId(storedTeamId);
         setIsAuthenticated(true);
      } else {
         setIsAuthenticated(false);
      }
   }, []);

   const login = async (credentials) => {
      try {
         // const response = await user.login(credentials);
         // const { token, id } = response.data.data;
         const response = await axios.get('https://6642243c3d66a67b34366411.mockapi.io/nimbus/login/1');
         const { token, id } = response.data;
         localStorage.setItem('token', token);
         localStorage.setItem('id', id);

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
      setTeamId(null);
      localStorage.clear();
      setIsAuthenticated(false);
   }

   const chooseTeam = (teamId) => {
      setTeamId(teamId);
      localStorage.setItem('teamId', teamId);
   }

   const logoutTeam = () => {
      setTeamId(null);
      localStorage.remove('teamId');
   }

   return (
      <AuthContext.Provider value={{token, userId, teamId, chooseTeam, logoutTeam, isAuthenticated, login, logout}}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   return useContext(AuthContext);
}

