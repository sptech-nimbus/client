import AppRoutes from "./routes/routes.jsx";
import { AuthProvider } from './contexts/auth.jsx';
import Loader from './components/Loader/Loader.jsx';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;
