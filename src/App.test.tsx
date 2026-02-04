import React from 'react';
import { render } from '@testing-library/react';
import { jest } from '@jest/globals';
import type { ComponentProps, ReactNode } from 'react';
import type { RouteProps, RoutesProps } from 'react-router-dom';
import type {
  AuthRedirectUri as DsAuthRedirectUri,
  Callback as DsCallback,
} from '@telicent-oss/ds';

let mockPathname = '/';
let callbackProps: ComponentProps<typeof DsCallback> | undefined;
let authRedirectProps: ComponentProps<typeof DsAuthRedirectUri> | undefined;

const mockConfig = {
  featureFlags: { FF_AUTH_V2: true },
  AUTH_V2_CONFIG_WITH_LOGOUT: {
    authServerUrl: 'https://auth.example.test',
    clientId: 'client-123',
    scope: 'openid profile',
    redirectUri: 'https://app.example.test/callback',
    popupRedirectUri: 'https://app.example.test/popup',
    onLogout: () => {},
  },
};

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: mockPathname }),
  Routes: ({ children }: RoutesProps) => <mock-routes>{children}</mock-routes>,
  Route: ({ element, children, path }: RouteProps) => (
    <mock-route data-path={path ?? 'index'}>{element ?? children}</mock-route>
  ),
}));

jest.mock('@telicent-oss/ds', () => ({
  Callback: (props: ComponentProps<typeof DsCallback>) => {
    callbackProps = props;
    return <mock-callback />;
  },
  AuthRedirectUri: (props: ComponentProps<typeof DsAuthRedirectUri>) => {
    authRedirectProps = props;
    return <mock-auth-redirect-uri />;
  },
}));

jest.mock('components', () => ({
  Sparql: () => <mock-sparql />,
  UserFetch: ({ children }: { children?: ReactNode }) => (
    <mock-user-fetch>{children}</mock-user-fetch>
  ),
  UserInfo: () => <mock-user-info />,
  ProtectedRoutes: ({ children }: { children?: ReactNode }) => (
    <mock-protected-routes>{children}</mock-protected-routes>
  ),
}));

jest.mock('lib', () => ({
  ErrorPage: () => <mock-error-page />,
}));

jest.mock('./components/Graphiql/TelicentGraphiQL', () => () => <mock-graphiql />);

jest.mock('config/app-config', () => ({ __esModule: true, default: mockConfig }));

const App = require('./App').default;

describe('App', () => {
  beforeEach(() => {
    mockPathname = '/';
    callbackProps = undefined;
    authRedirectProps = undefined;
    mockConfig.featureFlags = { FF_AUTH_V2: true };
  });

  it('renders callback route when pathname ends with /callback', () => {
    mockPathname = '/callback';

    const { asFragment } = render(<App />);
    const inputs = { pathname: mockPathname, featureFlags: mockConfig.featureFlags };
    const output = {
      callbackProps,
      authRedirectProps,
    };

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "featureFlags": {
            "FF_AUTH_V2": true,
          },
          "pathname": "/callback",
        },
        "output": {
          "authRedirectProps": undefined,
          "callbackProps": {
            "clientId": "client-123",
          },
        },
      }
    `);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <mock-routes>
          <mock-route
            data-path="/callback"
          >
            <mock-callback />
          </mock-route>
        </mock-routes>
      </DocumentFragment>
    `);
  });

  it('renders auth redirect when feature flag is on', () => {
    mockPathname = '/';
    mockConfig.featureFlags = { FF_AUTH_V2: true };

    const { asFragment } = render(<App />);
    const inputs = { pathname: mockPathname, featureFlags: mockConfig.featureFlags };
    const output = {
      callbackProps,
      authRedirectProps,
    };

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "featureFlags": {
            "FF_AUTH_V2": true,
          },
          "pathname": "/",
        },
        "output": {
          "authRedirectProps": {
            "config": {
              "authServerUrl": "https://auth.example.test",
              "clientId": "client-123",
              "onLogout": [Function],
              "popupRedirectUri": "https://app.example.test/popup",
              "redirectUri": "https://app.example.test/callback",
              "scope": "openid profile",
            },
          },
          "callbackProps": undefined,
        },
      }
    `);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <mock-routes>
          <mock-route
            data-path="index"
          >
            <mock-protected-routes />
          </mock-route>
          <mock-route
            data-path="/health"
          >
            <h3>
              Hello I'm Telicent Query
            </h3>
          </mock-route>
          <mock-route
            data-path="/user-info"
          >
            <mock-user-info />
          </mock-route>
          <mock-route
            data-path="/error"
          >
            <mock-error-page />
          </mock-route>
          <mock-route
            data-path="/auth-redirect-uri"
          >
            <mock-auth-redirect-uri />
          </mock-route>
        </mock-routes>
      </DocumentFragment>
    `);
  });

  it('skips auth redirect when feature flag is off', () => {
    mockPathname = '/';
    mockConfig.featureFlags = { FF_AUTH_V2: false };

    const { asFragment } = render(<App />);
    const inputs = { pathname: mockPathname, featureFlags: mockConfig.featureFlags };
    const output = {
      callbackProps,
      authRedirectProps,
    };

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "featureFlags": {
            "FF_AUTH_V2": false,
          },
          "pathname": "/",
        },
        "output": {
          "authRedirectProps": undefined,
          "callbackProps": undefined,
        },
      }
    `);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <mock-routes>
          <mock-route
            data-path="index"
          >
            <mock-protected-routes />
          </mock-route>
          <mock-route
            data-path="/health"
          >
            <h3>
              Hello I'm Telicent Query
            </h3>
          </mock-route>
          <mock-route
            data-path="/user-info"
          >
            <mock-user-info />
          </mock-route>
          <mock-route
            data-path="/error"
          >
            <mock-error-page />
          </mock-route>
        </mock-routes>
      </DocumentFragment>
    `);
  });
});
