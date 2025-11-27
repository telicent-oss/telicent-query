import React from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth, AuthModal } from '@telicent-oss/ds';

export const ProtectedRoutes = () => {
  const { user, login } = useAuth();

  if (!user) {
    login();
    return null;
  }

  return (
    <>
      <AuthModal />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
