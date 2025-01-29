import React, { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { TeliButton, TeliStandardLayout } from '@telicent-oss/ds';

import config from '../config/app-config';

const ErrorPage = () => {
  const { state } = useLocation();

  return (
    <TeliStandardLayout appName="query" beta={config.beta} apps={config.apps}>
      {!state?.err ? (
        <Navigate to="/" replace />
      ) : (
        <section className="mt-4 ml-4">
          <p>Error code: {state.err.code}</p>
          <p>{state.err.message}</p>
          <TeliButton variant="secondary" className="mt-6">
            <Link to="/">Retry</Link>
          </TeliButton>
        </section>
      )}
    </TeliStandardLayout>
  );
};

export default ErrorPage;
