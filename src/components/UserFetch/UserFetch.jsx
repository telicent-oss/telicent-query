import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';

import config from '../../config/app-config';

const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

const ResponseSchema = z.object({
  data: z.object({
    active: z.boolean(),
  }),
});

const UserFetch = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [err, setErr] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${config.access.url}/whoami`);
      const data = ResponseSchema.parse(response).data;
      setIsLoading(false);
      return { active: Boolean(data?.active), error: null };
    } catch (error) {
      setIsLoading(false);
      try {
        const validError = ErrorSchema.parse(error);
        return { active: false, error: validError };
      } catch (finalError) {
        return { active: false, error: { code: '', message: `${finalError}` } };
      }
    }
  };

  useEffect(() => {
    fetchUser().then((data) => {
      setErr(data.error);
      setIsActive(data.active);
    });
    return () => {
      setErr(null);
    };
  }, []);

  if (isLoading === null) {
    return <section>Loading...</section>;
  }

  if (err) {
    return <Navigate to="/error" replace state={{ err }} />;
  }

  return isActive ? <Outlet /> : <Navigate to="/user-info" replace />;
};

export default UserFetch;
