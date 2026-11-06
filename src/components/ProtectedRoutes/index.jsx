import { Outlet } from 'react-router-dom';

import { useAuth, AuthModal } from '@telicent-oss/ds';
import { useAppReady } from '../../hooks/useAppReady';

// import { usePermissions } from "../UserProfile/useFetchUser/usePermissions";

export const ProtectedRoutes = () => {
  const { user, authClient } = useAuth();
  // Fallback to parsing the ID token directly (AuthProvider sometimes leaves `user` null
  // when cross-domain `/userinfo` calls return 401 even though the session is valid).
  const derivedUser = user ?? authClient?.getUserInfo?.();
  useAppReady(Boolean(derivedUser));

  // Auth is resolving: the app loader covers this state. AuthModal stays
  // mounted so it can open (above the loader) on an UNAUTHORIZED event.
  if (!derivedUser) return <AuthModal />;

  return (
    <>
      <AuthModal />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
