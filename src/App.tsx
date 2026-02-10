import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import { AuthRedirectUri, Callback } from '@telicent-oss/ds';
import config from 'config/app-config';

import { Sparql, UserFetch, UserInfo, ProtectedRoutes } from 'components';
import { ErrorPage } from 'lib';
import TelicentGraphiQL from './components/Graphiql/TelicentGraphiQL';

const App = () => {
  const location = useLocation();
  const isCallback = location.pathname.endsWith('/callback');

  if (isCallback) {
    return (
      <Routes>
        <Route
          path="/callback"
          element={<Callback clientId={config.AUTH_V2_CONFIG_WITH_LOGOUT.clientId} />}
        />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<UserFetch />}>
          <Route path="/" element={<Sparql />} />
          <Route path="/graphiql" element={<TelicentGraphiQL />} />
        </Route>
      </Route>
      <Route path="/health" element={<h3>Hello I'm Telicent Query</h3>} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/error" element={<ErrorPage />} />
      {config.featureFlags?.FF_AUTH_V2 && (
        <Route
          path="/auth-redirect-uri"
          element={<AuthRedirectUri config={config.AUTH_V2_CONFIG_WITH_LOGOUT} />}
        />
      )}
    </Routes>
  );
};

export default App;
