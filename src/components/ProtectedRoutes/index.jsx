import { Outlet } from 'react-router-dom';

import { useAuth, AuthModal } from '@telicent-oss/ds';
// import { useEffect } from "react";

// import { usePermissions } from "../UserProfile/useFetchUser/usePermissions";

export const ProtectedRoutes = () => {
  const { user, authClient } = useAuth();
  // Fallback to parsing the ID token directly (AuthProvider sometimes leaves `user` null
  // when cross-domain `/userinfo` calls return 401 even though the session is valid).
  const derivedUser = user ?? authClient?.getUserInfo?.();

  if (!derivedUser) return null;

  return (
    <>
      <AuthModal />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
