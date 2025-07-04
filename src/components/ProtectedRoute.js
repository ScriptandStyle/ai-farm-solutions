import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}

export default ProtectedRoute;
