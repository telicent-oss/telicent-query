import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@telicent-oss/ds';

const UserFetch = () => {
  const { user, loading: isLoading, error } = useAuth();

  console.log({ user, loading: isLoading, error });
  if (isLoading === null) {
    return <section>Loading...</section>;
  }

  if (error) {
    return <Navigate to="/error" replace state={{ err: error }} />;
  }

  // TODO: handle popup properly
  return <Outlet />;
};

export default UserFetch;
