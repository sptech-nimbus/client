/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState, useEffect } from "react";
import user from '@api/user';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(localStorage.getItem('token') || null);
   const [userId, setUserId] = useState(localStorage.getItem('id') || null);
   const [teamId, setTeamId] = useState(localStorage.getItem('teamId') || null);
   const [personaId, setPersonaId] = useState(localStorage.getItem('personaId') || null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('id');
      const storedTeamId = localStorage.getItem('teamId');
      const storedPersonaId = localStorage.getItem('personaId');

      if (storedToken && storedUserId) {
         setToken(storedToken);
         setUserId(storedUserId);
         setTeamId(storedTeamId);
         setPersonaId(storedPersonaId);
         setIsAuthenticated(true);
      } else {
         setIsAuthenticated(false);
      }
   }, []);

   const login = async (credentials) => {
      try {
         const response = await user.login(credentials);
         const { token, userId, personaId } = response.data.data;

         console.log(response);
         localStorage.setItem('token', token);
         localStorage.setItem('id', userId);
         localStorage.setItem('personaId', personaId);
         localStorage.setItem('typeUser', response.data.serverMsg);

         
         setToken(token);
         setUserId(userId);

         setIsAuthenticated(true);
      }
      catch (err) {
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
      sessionStorage.setItem('teamId', teamId);
   }

   const logoutTeam = () => {
      setTeamId(null);
      localStorage.remove('teamId');
   }

   return (
      <AuthContext.Provider value={{ token, userId, teamId, personaId, chooseTeam, logoutTeam, isAuthenticated, login, logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => {
   return useContext(AuthContext);
}

