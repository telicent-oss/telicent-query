import React from 'react';
import { TeliButton, TeliStandardLayout, useAuth } from '@telicent-oss/ds';
import config from 'config/app-config';

const InactiveProfileNew = () => {
  const { login } = useAuth();
  console.log(login);
  return (
    <TeliStandardLayout appName="query" beta={config.beta} apps={config.apps}>
      <section className="mt-4 ml-4">
        <p>
          Your profile is currently inactive. Please contact your system administrator. You cannot
          continue until your profile is activated and attributes have been set.
        </p>
        <TeliButton variant="secondary" className="mt-6" onClick={login}>
          Retry
        </TeliButton>
      </section>
    </TeliStandardLayout>
  );
};

export default InactiveProfileNew;
