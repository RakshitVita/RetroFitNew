// utils/protectedRoute.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../Zustand_State/AuthStore'; // adjust if needed
import LoginG from '../components/Google_Login/LoginG';

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  if (!authUser) {
    return <LoginG asModal={true} onClose={() => navigate('/home')} />;
  }

  return <Outlet />; // 👈 required to render nested routes
};

export default ProtectedRoute;
