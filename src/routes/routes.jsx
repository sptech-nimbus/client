import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from "@pages/LandingPage";
import TeamRoster from "@pages/TeamRoster";
import Login from "@pages/Login";
import Register from "@pages/Register";
import NotFound from "@pages/NotFound";
import PlayerInfo from "@pages/Athlete";
import AboutUs from '@pages/AboutUs';
import Home from '@pages/Home';
import Settings from '@pages/Settings';
import Dashboard from "@pages/Dashboard";
import Events from '@pages/Events';
import Chat from '@pages/Chat';
import ForgotPassword from '@pages/ForgotPassword';
import MyTeams from '@pages/MyTeams';
import Match from '@pages/Match';
import JoinTeam from '@pages/JoinTeam';

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
                  <ProtectedRoute requireTeam>
                     <Home />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/dashboard" 
               element={
                  <ProtectedRoute requireTeam>
                     <Dashboard />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/roster" 
               element={
                  <ProtectedRoute requireTeam>
                     <TeamRoster />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/athlete" 
               element={
                  <ProtectedRoute requireTeam>
                     <PlayerInfo />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/config" 
               element={
                  <ProtectedRoute requireTeam>
                     <Settings />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/events" 
               element={
                  <ProtectedRoute requireTeam>
                     <Events />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/chat" 
               element={
                  <ProtectedRoute requireTeam>
                     <Chat />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/forgot-password" 
               element={<ForgotPassword />} 
            />
            <Route 
               path="/my-teams" 
               element={
                  <ProtectedRoute>
                     <MyTeams />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/match" 
               element={
                  <ProtectedRoute>
                     <Match />
                  </ProtectedRoute>
               } 
            />
            <Route 
               path="/match/finished" 
               element={
                  <ProtectedRoute>
                     <Match isMatchFinished/>
                  </ProtectedRoute>
               } 
            />
            <Route path='/join-team' element={<JoinTeam />}/>
         </Routes>
      </Router>
   )
}
