import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from "@pages/LandingPage";
import TeamRoster from "@pages/TeamRoster";
import Login from "@pages/Login";
import Register from "@pages/Register";
import NotFound from "@pages/NotFound";

export default function AppRoutes() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/cadastro" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/elenco" element={<TeamRoster />}/>
            <Route path="*" element={<NotFound />}/>
         </Routes>
      </Router>
   )
}