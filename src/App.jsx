import AppRoutes from "./routes.jsx";
import { AuthProvider } from './contexts/auth.jsx';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;
