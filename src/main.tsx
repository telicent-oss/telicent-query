import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@telicent-oss/ds/dist/style.css';
import './main.css';
import config from 'config/app-config';
import { AuthProvider, UIThemeProvider } from '@telicent-oss/ds';
import { QueryClient } from '@tanstack/react-query';
import APP_CONFIG_JSON from './app.config.json';

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

const root = createRoot(document.getElementById('root')!);
const basename = `/${APP_CONFIG_JSON['uri-basename']}`;
const RenderApp = (
  <UIThemeProvider dark theme="GraphOrange">
    <BrowserRouter basename={basename}>
      {config.featureFlags.FF_AUTH_V2 ? (
        <AuthProvider
          config={config.AUTH_V2_CONFIG_WITH_LOGOUT}
          apiUrl={config.AUTH_V2_CONFIG_WITH_LOGOUT.authServerUrl}
          queryClient={queryClient}
        >
          <App />
        </AuthProvider>
      ) : (
        <App />
      )}
    </BrowserRouter>
  </UIThemeProvider>
);

root.render(RenderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
