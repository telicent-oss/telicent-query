import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRedirectUri, Callback } from '@telicent-oss/ds';
import config from 'config/app-config';

import { Sparql, UserFetch, UserInfo, ProtectedRoutes } from 'components';
import { ErrorPage } from 'lib';

import APP_CONFIG_JSON from './app.config.json';
import TelicentGraphiQL from './components/Graphiql/TelicentGraphiQL';

const basename = `/${APP_CONFIG_JSON['uri-basename']}`;

console.log({ config });
const App = () => (
  <BrowserRouter basename={basename}>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<UserFetch />}>
          <Route index element={<Sparql />} />
          <Route path="/graphiql" element={<TelicentGraphiQL />} />
        </Route>
      </Route>
      <Route path="/health" element={<h3>Hello I'm Telicent Query</h3>} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/error" element={<ErrorPage />} />
      {config.featureFlags?.FF_AUTH_V2 && (
        <>
          <Route
            path="/auth-redirect-uri"
            element={
              <AuthRedirectUri
                config={{
                  onLogout: () => {
                    console.log('You are now logged out. Redirecting');
                    window.location.href = basename;
                  },
                  ...config.AUTH_V2_CONFIG,
                }}
              />
            }
          />
          <Route path="/callback" element={
            <Callback clientId={config.AUTH_V2_CONFIG.clientId} />
          } />
        </>
      )}
    </Routes>
  </BrowserRouter>
);

export default App;
