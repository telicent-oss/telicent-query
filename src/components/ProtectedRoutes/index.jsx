import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth, AuthModal } from '@telicent-oss/ds';

export const ProtectedRoutes = () => {
  const { user, login } = useAuth();

  useEffect(() => {
    if (!user) {
      login();
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <AuthModal />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
