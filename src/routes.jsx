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
import ForgotPassword from './pages/ForgotPassword';

export default function AppRoutes() {
   return (
      <Router>
         <Routes>
            <Route path="*" element={<NotFound />}/>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/about-us" element={<AboutUs />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/roster" element={<TeamRoster />}/>
            <Route path="/athlete" element={<PlayerInfo />} />
            <Route path="/config" element={<Settings />}/>
            <Route path="/news" element={<News />}/>
            <Route path="/events" element={<Events />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
         </Routes>
      </Router>
   )
}