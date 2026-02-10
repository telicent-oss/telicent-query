import { jest } from '@jest/globals';
import { Env } from 'config/env/env.schema';
import z from 'zod';

const appConfigJsonMock = {
  name: 'app-name',
  repo_name: 'repo-name',
  app_name: 'App Name',
  app_name_snake_case: 'app_name',
  'uri-basename': 'alpha',
  brandColor: '#000000',
};

const authConfig = {
  authServerUrl: 'https://auth.example.test',
  clientId: 'client-123',
  scope: 'openid profile',
  redirectUri: 'https://app.example.test/callback',
  popupRedirectUri: 'https://app.example.test/popup',
};

const loadConfig = (envOverrides: Env) => {
  jest.resetModules();
  jest.doMock('../../app.config.json', () => appConfigJsonMock);
  jest.doMock('../env/getEnv', () => ({ getEnv: () => envOverrides }));
  jest.doMock('@telicent-oss/ds', () => ({
    AppSwitchLibrarySchema: z.array(z.unknown()),
  }));

  return require('../app-config');
};

const setWindowLocation = (href = 'https://example.test') => {
  Object.defineProperty(window, 'location', {
    value: { href },
    writable: true,
    configurable: true,
  });
};

describe('app-config', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    setWindowLocation();
  });

  it('builds config from env', () => {
    const envOverrides = {
      ACCESS_URL: 'https://ACCESS_URL.example.test',
      GRAPHQL_URL: 'https://GRAPHQL_URL.example.test',
      SPARQL_URL: 'https://SPARQL_URL.example.test',
      BETA: true,
      featureFlags: { FF_AUTH_V2: true },
      AUTH_V2_CONFIG: authConfig,
    };
    const { default: config, getConfig } = loadConfig(envOverrides);

    expect({ inputs: envOverrides, output: config }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "ACCESS_URL": "https://ACCESS_URL.example.test",
          "AUTH_V2_CONFIG": {
            "authServerUrl": "https://auth.example.test",
            "clientId": "client-123",
            "popupRedirectUri": "https://app.example.test/popup",
            "redirectUri": "https://app.example.test/callback",
            "scope": "openid profile",
          },
          "BETA": true,
          "GRAPHQL_URL": "https://GRAPHQL_URL.example.test",
          "SPARQL_URL": "https://SPARQL_URL.example.test",
          "featureFlags": {
            "FF_AUTH_V2": true,
          },
        },
        "output": {
          "ACCESS_URL": "https://ACCESS_URL.example.test",
          "APP_CONFIG_JSON": {
            "app_name": "App Name",
            "app_name_snake_case": "app_name",
            "brandColor": "#000000",
            "name": "app-name",
            "repo_name": "repo-name",
            "uri-basename": "alpha",
          },
          "APP_SWITCH_LIBRARY": [],
          "AUTH_V2_CONFIG_WITH_LOGOUT": {
            "authServerUrl": "https://auth.example.test",
            "clientId": "client-123",
            "onLogout": [Function],
            "popupRedirectUri": "https://app.example.test/popup",
            "redirectUri": "https://app.example.test/callback",
            "scope": "openid profile",
          },
          "GRAPHQL_URL": "https://GRAPHQL_URL.example.test",
          "SPARQL_URL": "https://SPARQL_URL.example.test",
          "beta": true,
          "featureFlags": {
            "FF_AUTH_V2": true,
          },
        },
      }
    `);

    expect(getConfig()).toBe(config);
  });

  it('handles missing feature flags and beta false', () => {
    const envOverrides = {
      ACCESS_URL: 'https://ACCESS_URL.example.test',
      GRAPHQL_URL: 'https://GRAPHQL_URL.example.test',
      SPARQL_URL: 'https://SPARQL_URL.example.test',
      BETA: false,
      AUTH_V2_CONFIG: authConfig,
    };
    const { default: config } = loadConfig(envOverrides);

    expect({ inputs: envOverrides, output: config }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "ACCESS_URL": "https://ACCESS_URL.example.test",
          "AUTH_V2_CONFIG": {
            "authServerUrl": "https://auth.example.test",
            "clientId": "client-123",
            "popupRedirectUri": "https://app.example.test/popup",
            "redirectUri": "https://app.example.test/callback",
            "scope": "openid profile",
          },
          "BETA": false,
          "GRAPHQL_URL": "https://GRAPHQL_URL.example.test",
          "SPARQL_URL": "https://SPARQL_URL.example.test",
        },
        "output": {
          "ACCESS_URL": "https://ACCESS_URL.example.test",
          "APP_CONFIG_JSON": {
            "app_name": "App Name",
            "app_name_snake_case": "app_name",
            "brandColor": "#000000",
            "name": "app-name",
            "repo_name": "repo-name",
            "uri-basename": "alpha",
          },
          "APP_SWITCH_LIBRARY": [],
          "AUTH_V2_CONFIG_WITH_LOGOUT": {
            "authServerUrl": "https://auth.example.test",
            "clientId": "client-123",
            "onLogout": [Function],
            "popupRedirectUri": "https://app.example.test/popup",
            "redirectUri": "https://app.example.test/callback",
            "scope": "openid profile",
          },
          "GRAPHQL_URL": "https://GRAPHQL_URL.example.test",
          "SPARQL_URL": "https://SPARQL_URL.example.test",
          "beta": false,
          "featureFlags": {
            "FF_AUTH_V2": false,
          },
        },
      }
    `);
  });

  it('triggers logout side effects', () => {
    const envOverrides: Env = {
      GRAPHQL_URL: 'https://GRAPHQL_URL.example.test',
      SPARQL_URL: 'https://SPARQL_URL.example.test',
      AUTH_V2_CONFIG: authConfig,
    };
    const { default: config } = loadConfig(envOverrides);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const initialHref = window.location.href;

    config.AUTH_V2_CONFIG_WITH_LOGOUT.onLogout();

    expect({
      inputs: { env: envOverrides, href: initialHref },
      output: { consoleCalls: consoleSpy.mock.calls, href: window.location.href },
    }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "env": {
            "AUTH_V2_CONFIG": {
              "authServerUrl": "https://auth.example.test",
              "clientId": "client-123",
              "popupRedirectUri": "https://app.example.test/popup",
              "redirectUri": "https://app.example.test/callback",
              "scope": "openid profile",
            },
            "GRAPHQL_URL": "https://GRAPHQL_URL.example.test",
            "SPARQL_URL": "https://SPARQL_URL.example.test",
          },
          "href": "https://example.test",
        },
        "output": {
          "consoleCalls": [
            [
              "You are now logged out. Redirecting",
            ],
          ],
          "href": "/alpha",
        },
      }
    `);
  });
});
