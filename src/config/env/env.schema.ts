import { z } from 'zod';
import { AUTH_V2_CONFIG_SCHEMA } from '../app-config.AUTH_V2_CONFIG.schemas-types';

// Local schema: each app-switch entry carries a dark and a light icon so the
// Header can pick the right one at render time based on the active theme
// mode. This extends the DS's single-`icon` shape without forking the DS
// AppSwitchLibrarySchema; consumers map to `{ icon }` at the render boundary.
export const AppSwitchLibraryEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  iconDark: z.string(),
  iconLight: z.string(),
});

export type AppSwitchLibraryEntry = z.infer<typeof AppSwitchLibraryEntrySchema>;

export const ENV_SCHEMA = z.object({
  GRAPHQL_URL: z.string(),
  SPARQL_URL: z.string(),
  MAP_TILER_TOKEN: z.string().optional(),
  ARC_GIS_API_TOKEN: z.string().optional(),
  BETA: z.boolean().optional(),
  AUTH_V2_CONFIG: AUTH_V2_CONFIG_SCHEMA,
  APP_SWITCH_LIBRARY: z.array(AppSwitchLibraryEntrySchema).optional(),
});

export type Env = z.infer<typeof ENV_SCHEMA>;
