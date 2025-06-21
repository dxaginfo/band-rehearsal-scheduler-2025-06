import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Main App Pages
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Band Pages
import BandsListPage from './pages/bands/BandsListPage';
import BandDetailsPage from './pages/bands/BandDetailsPage';
import CreateBandPage from './pages/bands/CreateBandPage';
import EditBandPage from './pages/bands/EditBandPage';

// Rehearsal Pages
import RehearsalsListPage from './pages/rehearsals/RehearsalsListPage';
import RehearsalDetailsPage from './pages/rehearsals/RehearsalDetailsPage';
import CreateRehearsalPage from './pages/rehearsals/CreateRehearsalPage';
import EditRehearsalPage from './pages/rehearsals/EditRehearsalPage';

// Availability Pages
import AvailabilitySettingsPage from './pages/availability/AvailabilitySettingsPage';

// Other Pages
import NotFoundPage from './pages/NotFoundPage';

// Redux actions
import { checkAuth } from './redux/slices/authSlice';

// Types
import { RootState } from './redux/store';

// Theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Guest Only Route (redirect if logged in)
const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  const dispatch = useDispatch();
  
  // Check authentication status on app load
  useEffect(() => {
    dispatch(checkAuth() as any);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route 
                path="/login" 
                element={
                  <GuestRoute>
                    <LoginPage />
                  </GuestRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <GuestRoute>
                    <RegisterPage />
                  </GuestRoute>
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  <GuestRoute>
                    <ForgotPasswordPage />
                  </GuestRoute>
                } 
              />
              <Route 
                path="/reset-password/:token" 
                element={
                  <GuestRoute>
                    <ResetPasswordPage />
                  </GuestRoute>
                } 
              />
            </Route>
            
            {/* Protected App Routes */}
            <Route element={<MainLayout />}>
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Band Routes */}
              <Route 
                path="/bands" 
                element={
                  <ProtectedRoute>
                    <BandsListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bands/create" 
                element={
                  <ProtectedRoute>
                    <CreateBandPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bands/:bandId" 
                element={
                  <ProtectedRoute>
                    <BandDetailsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bands/:bandId/edit" 
                element={
                  <ProtectedRoute>
                    <EditBandPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rehearsal Routes */}
              <Route 
                path="/rehearsals" 
                element={
                  <ProtectedRoute>
                    <RehearsalsListPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rehearsals/create" 
                element={
                  <ProtectedRoute>
                    <CreateRehearsalPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rehearsals/:rehearsalId" 
                element={
                  <ProtectedRoute>
                    <RehearsalDetailsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rehearsals/:rehearsalId/edit" 
                element={
                  <ProtectedRoute>
                    <EditRehearsalPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Availability Routes */}
              <Route 
                path="/availability" 
                element={
                  <ProtectedRoute>
                    <AvailabilitySettingsPage />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            {/* Redirect root to dashboard or login depending on auth state */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;