import z from 'zod';
import APP_CONFIG_JSON from '../app.config.json';
import { AUTH_V2_CONFIG_WITH_LOGOUT_SCHEMA } from './app-config.AUTH_V2_CONFIG.schemas-types';
import { getEnv } from './env/getEnv';
import { ENV_SCHEMA } from './env/env.schema';
import { APP_CONFIG_JSON_SCHEMA } from '../constants';
import { AppSwitchLibrarySchema } from '@telicent-oss/ds';
import { renderErrorForReleaseEngineer } from '../lib/renderErrorForReleaseEngineer';

const env = getEnv();

const config = (() => {
  try {
    return z
      .object({
        ACCESS_URL: ENV_SCHEMA.shape.ACCESS_URL,
        GRAPHQL_URL: ENV_SCHEMA.shape.GRAPHQL_URL,
        SPARQL_URL: ENV_SCHEMA.shape.SPARQL_URL,
        beta: z.boolean().optional(),
        featureFlags: z.object({
          FF_AUTH_V2: z.boolean(),
        }),
        APP_CONFIG_JSON: APP_CONFIG_JSON_SCHEMA,
        AUTH_V2_CONFIG_WITH_LOGOUT: AUTH_V2_CONFIG_WITH_LOGOUT_SCHEMA,
        APP_SWITCH_LIBRARY: z.array(AppSwitchLibrarySchema),
      })
      .parse({
        ACCESS_URL: env.ACCESS_URL,
        GRAPHQL_URL: env.GRAPHQL_URL,
        SPARQL_URL: env.SPARQL_URL,
        beta: env.BETA,
        featureFlags: {
          FF_AUTH_V2: Boolean(env.featureFlags?.FF_AUTH_V2),
        },
        APP_CONFIG_JSON,
        AUTH_V2_CONFIG_WITH_LOGOUT: {
          ...(env.AUTH_V2_CONFIG || null),
          onLogout: () => {
            console.log('You are now logged out. Redirecting');
            window.location.href = `/${APP_CONFIG_JSON['uri-basename']}`;
          },
        },
        APP_SWITCH_LIBRARY: [],
      });
  } catch (error) {
    renderErrorForReleaseEngineer(error, 'app-config');
    throw error;
  }
})();

export const getConfig = () => config;

export default config;
