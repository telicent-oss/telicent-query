import { z } from 'zod';

export const AUTH_V2_CONFIG_SCHEMA = z.object({
  authServerUrl: z.string(),
  clientId: z.string(),
  scope: z.string(),
  redirectUri: z.string(),
  popupRedirectUri: z.string(),
});

export const AUTH_V2_CONFIG_WITH_LOGOUT_SCHEMA = AUTH_V2_CONFIG_SCHEMA.extend({
  onLogout: z.function().args().returns(z.void()),
});

export type AuthV2Config = z.infer<typeof AUTH_V2_CONFIG_SCHEMA>;
export type AuthV2ConfigWithLogout = z.infer<typeof AUTH_V2_CONFIG_WITH_LOGOUT_SCHEMA>;
