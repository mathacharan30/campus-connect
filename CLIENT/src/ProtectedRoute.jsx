// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = useSelector((state) => state.authUser.user?.userRole);

  return userRole && allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/notAuthorized" replace />
  );
};

export default ProtectedRoute;
