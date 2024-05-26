import AppRoutes from "./routes/routes.jsx";
import { AuthProvider } from './contexts/auth.jsx';
import { NotificationProvider } from './contexts/notification.jsx';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App;
