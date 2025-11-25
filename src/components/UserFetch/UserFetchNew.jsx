import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@telicent-oss/ds';

const UserFetch = () => {
  const { loading: isLoading, error } = useAuth();

  if (isLoading) {
    return <section>Loading...</section>;
  }

  if (error) {
    return <Navigate to="/error" replace state={{ err: error }} />;
  }

  // TODO: handle popup properly
  return <Outlet />;
};

export default UserFetch;
