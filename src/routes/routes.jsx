import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from "@pages/LandingPage";
import TeamRoster from "@pages/TeamRoster";
import Login from "@pages/Login";
import Register from "@pages/Register";
import NotFound from "@pages/NotFound";
import PlayerInfo from "@pages/Athlete";
import AboutUs from '@pages/AboutUs';
import News from '@pages/News';
import Home from '@pages/Home';
import Settings from '@pages/Settings';
import Dashboard from "@pages/Dashboard";
import Events from '@pages/Events';
import Chat from '@pages/Chat';
import ForgotPassword from '@pages/ForgotPassword';
import MyTeams from '@pages/MyTeams';

import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
   return (
      <Router>
         <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/team" element={<Register team />} />
            <Route 
               path="/home" 
               element={
                  <ProtectedRoute>
                     <Home />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/dashboard" 
               element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/roster" 
               element={
                  <ProtectedRoute>
                     <TeamRoster />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/athlete" 
               element={
                  <ProtectedRoute>
                     <PlayerInfo />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/config" 
               element={
                  <ProtectedRoute>
                     <Settings />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/news" 
               element={
                  <ProtectedRoute>
                     <News />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/events" 
               element={
                  <ProtectedRoute>
                     <Events />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/chat" 
               element={
                  <ProtectedRoute>
                     <Chat />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/forgot-password" 
               element={
                  <ProtectedRoute>
                     <ForgotPassword />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/my-teams" 
               element={
                  <ProtectedRoute>
                     <MyTeams />
                  </ProtectedRoute>
               } 
            />
         </Routes>
      </Router>
   )
}
