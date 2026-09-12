import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { Landing } from './pages/Landing';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Quests } from './pages/Quests';
import { Profile } from './pages/Profile';
import { Shop } from './pages/Shop';
import { History } from './pages/History';
import { Achievements } from './pages/Achievements';
import { Settings } from './pages/Settings';

// Protected Route Guard (simulated auth)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  // If not authenticated, we still allow navigation or redirect to login.
  // For hackathon convenience, we can let users directly view dashboard if they type the URL,
  // but if unauthenticated, redirecting to /login is standard.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Authenticated Arena Layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/history" element={<History />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
        {/* Profile / Character page: accessible via top right user avatar/name */}
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
