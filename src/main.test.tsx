import React from 'react';
import { render } from '@testing-library/react';
import { jest } from '@jest/globals';
import type { ComponentProps, ReactNode } from 'react';
import type {
  AuthProvider as DsAuthProvider,
  UIThemeProvider as DsUIThemeProvider,
} from '@telicent-oss/ds';
import type { BrowserRouter as RouterBrowserRouter } from 'react-router-dom';

let authProviderProps: ComponentProps<typeof DsAuthProvider> | undefined;
let uiThemeProviderProps: ComponentProps<typeof DsUIThemeProvider> | undefined;
let browserRouterProps: ComponentProps<typeof RouterBrowserRouter> | undefined;
let renderedRootNode: ReactNode | undefined;
let createRootElement: Element | DocumentFragment | null | undefined;
let reportWebVitalsCallCount = 0;

const baseAuthConfig = {
  authServerUrl: 'https://auth.example.test',
  clientId: 'client-123',
  scope: 'openid profile',
  redirectUri: 'https://app.example.test/callback',
  popupRedirectUri: 'https://app.example.test/popup',
  onLogout: () => {},
};

const loadMain = ({
  featureFlagAuthV2,
  appBaseName = 'query',
}: {
  featureFlagAuthV2: boolean;
  appBaseName?: string;
}) => {
  jest.resetModules();
  document.body.innerHTML = '<div id="root"></div>';
  authProviderProps = undefined;
  uiThemeProviderProps = undefined;
  browserRouterProps = undefined;
  renderedRootNode = undefined;
  createRootElement = undefined;
  reportWebVitalsCallCount = 0;

  jest.doMock('react-dom/client', () => ({
    createRoot: (element: Element | DocumentFragment | null) => {
      createRootElement = element;
      return {
        render: (node: ReactNode) => {
          renderedRootNode = node;
        },
      };
    },
  }));

  jest.doMock('@telicent-oss/ds', () => ({
    AuthProvider: (props: ComponentProps<typeof DsAuthProvider>) => {
      authProviderProps = props;
      return <mock-auth-provider>{props.children}</mock-auth-provider>;
    },
    UIThemeProvider: (props: ComponentProps<typeof DsUIThemeProvider>) => {
      uiThemeProviderProps = props;
      return <mock-ui-theme-provider>{props.children}</mock-ui-theme-provider>;
    },
  }));

  jest.doMock('react-router-dom', () => ({
    BrowserRouter: (props: ComponentProps<typeof RouterBrowserRouter>) => {
      browserRouterProps = props;
      return <mock-browser-router>{props.children}</mock-browser-router>;
    },
  }));

  jest.doMock('./App', () => () => <mock-app />);
  jest.doMock('./reportWebVitals', () => () => {
    reportWebVitalsCallCount += 1;
  });
  jest.doMock('./app.config.json', () => ({ 'uri-basename': appBaseName }));
  jest.doMock('config/app-config', () => ({
    __esModule: true,
    default: {
      featureFlags: { FF_AUTH_V2: featureFlagAuthV2 },
      AUTH_V2_CONFIG_WITH_LOGOUT: baseAuthConfig,
    },
  }));
  jest.doMock('@telicent-oss/ds/dist/style.css', () => ({}), { virtual: true });
  jest.doMock('./main.css', () => ({}), { virtual: true });

  jest.isolateModules(() => {
    require('./main');
  });
};

describe('main', () => {
  it('renders AuthProvider branch when FF_AUTH_V2 is true', () => {
    const inputs = { featureFlagAuthV2: true, appBaseName: 'query' };

    loadMain(inputs);
    const { asFragment } = render(<>{renderedRootNode}</>);

    const output = {
      createRootElementId: (createRootElement as Element | null)?.id,
      reportWebVitalsCallCount,
      browserRouterProps: {
        basename: browserRouterProps?.basename,
      },
      authProviderProps: authProviderProps
        ? {
            apiUrl: authProviderProps.apiUrl,
            config: authProviderProps.config,
            hasQueryClient: Boolean(authProviderProps.queryClient),
          }
        : undefined,
    };

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "appBaseName": "query",
          "featureFlagAuthV2": true,
        },
        "output": {
          "authProviderProps": {
            "apiUrl": "https://auth.example.test",
            "config": {
              "authServerUrl": "https://auth.example.test",
              "clientId": "client-123",
              "onLogout": [Function],
              "popupRedirectUri": "https://app.example.test/popup",
              "redirectUri": "https://app.example.test/callback",
              "scope": "openid profile",
            },
            "hasQueryClient": true,
          },
          "browserRouterProps": {
            "basename": "/query",
          },
          "createRootElementId": "root",
          "reportWebVitalsCallCount": 1,
        },
      }
    `);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <mock-ui-theme-provider>
          <mock-browser-router>
            <mock-auth-provider>
              <mock-app />
            </mock-auth-provider>
          </mock-browser-router>
        </mock-ui-theme-provider>
      </DocumentFragment>
    `);
  });

  it('renders App directly when FF_AUTH_V2 is false', () => {
    const inputs = { featureFlagAuthV2: false, appBaseName: 'query' };

    loadMain(inputs);
    const { asFragment } = render(<>{renderedRootNode}</>);

    const output = {
      createRootElementId: (createRootElement as Element | null)?.id,
      reportWebVitalsCallCount,
      browserRouterProps: {
        basename: browserRouterProps?.basename,
      },
      authProviderProps,
    };

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "appBaseName": "query",
          "featureFlagAuthV2": false,
        },
        "output": {
          "authProviderProps": undefined,
          "browserRouterProps": {
            "basename": "/query",
          },
          "createRootElementId": "root",
          "reportWebVitalsCallCount": 1,
        },
      }
    `);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <mock-ui-theme-provider>
          <mock-browser-router>
            <mock-app />
          </mock-browser-router>
        </mock-ui-theme-provider>
      </DocumentFragment>
    `);
  });
});
