import React from 'react';
import { Link } from 'react-router-dom';
import { TeliButton, TeliStandardLayout } from '@telicent-oss/ds';
import config from 'config/app-config';

const UserInfo = () => (
  <TeliStandardLayout appName="query" beta={config.beta} apps={config.apps}>
    <section className="mt-4 ml-4">
      <p>
        Your profile is currently inactive. Please contact your system administrator. You cannot
        continue until your profile is activated and attributes have been set.
      </p>
      <TeliButton variant="secondary" className="mt-6">
        <Link to="/">Retry</Link>
      </TeliButton>
    </section>
  </TeliStandardLayout>
);

export default UserInfo;
