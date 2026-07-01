import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../authStore';

export default function ProtectedRoute({ requireAdmin = false }: { requireAdmin?: boolean }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
