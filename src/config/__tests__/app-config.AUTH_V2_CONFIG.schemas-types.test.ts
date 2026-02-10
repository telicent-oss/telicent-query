import { jest } from '@jest/globals';
import {
  AUTH_V2_CONFIG_SCHEMA,
  AUTH_V2_CONFIG_WITH_LOGOUT_SCHEMA,
} from '../app-config.AUTH_V2_CONFIG.schemas-types';

const validAuthConfig = {
  authServerUrl: 'https://auth.example.test',
  clientId: 'client-123',
  scope: 'openid profile',
  redirectUri: 'https://app.example.test/callback',
  popupRedirectUri: 'https://app.example.test/popup',
};

describe('AUTH_V2_CONFIG schemas', () => {
  it('parses valid configs', () => {
    const inputs = { ...validAuthConfig };
    const output = AUTH_V2_CONFIG_SCHEMA.parse(inputs);

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "authServerUrl": "https://auth.example.test",
          "clientId": "client-123",
          "popupRedirectUri": "https://app.example.test/popup",
          "redirectUri": "https://app.example.test/callback",
          "scope": "openid profile",
        },
        "output": {
          "authServerUrl": "https://auth.example.test",
          "clientId": "client-123",
          "popupRedirectUri": "https://app.example.test/popup",
          "redirectUri": "https://app.example.test/callback",
          "scope": "openid profile",
        },
      }
    `);
  });

  it('surfaces missing fields', () => {
    const inputs = { ...validAuthConfig, clientId: undefined };
    const result = AUTH_V2_CONFIG_SCHEMA.safeParse(inputs);
    const output = result.success ? result.data : result.error.issues;

    expect({ inputs, output }).toMatchInlineSnapshot(`
      {
        "inputs": {
          "authServerUrl": "https://auth.example.test",
          "clientId": undefined,
          "popupRedirectUri": "https://app.example.test/popup",
          "redirectUri": "https://app.example.test/callback",
          "scope": "openid profile",
        },
        "output": [
          {
            "code": "invalid_type",
            "expected": "string",
            "message": "Required",
            "path": [
              "clientId",
            ],
            "received": "undefined",
          },
        ],
      }
    `);
  });

  it('extends with logout behavior', () => {
    const onLogout = jest.fn();
    const inputs = { ...validAuthConfig, onLogout };
    const output = AUTH_V2_CONFIG_WITH_LOGOUT_SCHEMA.parse(inputs);

    expect({ inputs: { ...inputs, onLogout: 'fn' }, output: { ...output, onLogout: 'fn' } })
      .toMatchInlineSnapshot(`
      {
        "inputs": {
          "authServerUrl": "https://auth.example.test",
          "clientId": "client-123",
          "onLogout": "fn",
          "popupRedirectUri": "https://app.example.test/popup",
          "redirectUri": "https://app.example.test/callback",
          "scope": "openid profile",
        },
        "output": {
          "authServerUrl": "https://auth.example.test",
          "clientId": "client-123",
          "onLogout": "fn",
          "popupRedirectUri": "https://app.example.test/popup",
          "redirectUri": "https://app.example.test/callback",
          "scope": "openid profile",
        },
      }
    `);
  });
});
