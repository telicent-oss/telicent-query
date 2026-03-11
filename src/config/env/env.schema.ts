import { z } from 'zod';
import { AUTH_V2_CONFIG_SCHEMA } from '../app-config.AUTH_V2_CONFIG.schemas-types';
import { AppSwitchLibrarySchema } from '@telicent-oss/ds';

export const ENV_SCHEMA = z.object({
  ACCESS_URL: z.string().optional(),
  GRAPHQL_URL: z.string(),
  SPARQL_URL: z.string(),
  BETA: z.boolean().optional(),
  featureFlags: z
    .object({
      FF_AUTH_V2: z.boolean().optional(),
    })
    .optional(),
  AUTH_V2_CONFIG: AUTH_V2_CONFIG_SCHEMA,
  APP_SWITCH_LIBRARY: z.array(AppSwitchLibrarySchema).optional(),
});

export type Env = z.infer<typeof ENV_SCHEMA>;
