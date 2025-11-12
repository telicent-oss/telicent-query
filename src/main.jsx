import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import '@telicent-oss/ds/dist/style.css';
import 'graphiql/graphiql.min.css';
import './main.css';
import config from 'config/app-config';
import { AuthProvider, UIThemeProvider } from '@telicent-oss/ds';
import { QueryClient } from '@tanstack/react-query';
import { APP_CONFIG_JSON } from 'constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

const root = createRoot(document.getElementById('root'));

const RenderApp = config.featureFlags.FF_AUTH_V2 ? (
  <UIThemeProvider dark theme="GraphOrange">
    <AuthProvider
      config={{
        onLogout: () => {
          console.log('You are now logged out. Redirecting');
          window.location.href = `/${APP_CONFIG_JSON['uri-basename']}`;
        },
        ...config?.AUTH_V2_CONFIG,
      }}
      apiUrl={config.apiUrl}
      queryClient={queryClient}
    >
      <App />
    </AuthProvider>
  </UIThemeProvider>
) : (
  <App />
);

root.render(RenderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
