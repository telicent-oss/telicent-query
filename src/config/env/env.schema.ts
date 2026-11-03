import { z } from 'zod';
import { AppSwitchLibrarySchema } from '@telicent-oss/ds';
import { AUTH_V2_CONFIG_SCHEMA } from '../app-config.AUTH_V2_CONFIG.schemas-types';

// Dataset names are interpolated into endpoint paths, so keep them to a safe charset.
export const DATASET_NAME_SCHEMA = z.string().regex(/^[A-Za-z0-9_-]+$/);

export const isValidDatasetName = (name: string): boolean =>
  DATASET_NAME_SCHEMA.safeParse(name).success;

export const DEFAULT_DATASETS = ['knowledge', 'ontology'];

export const ENV_SCHEMA = z.object({
  GRAPHQL_URL: z.string(),
  SPARQL_URL: z.string(),
  DATASETS: z.array(DATASET_NAME_SCHEMA).min(1).optional(),
  MAP_TILER_TOKEN: z.string().optional(),
  ARC_GIS_API_TOKEN: z.string().optional(),
  BETA: z.boolean().optional(),
  AUTH_V2_CONFIG: AUTH_V2_CONFIG_SCHEMA,
  APP_SWITCH_LIBRARY: z.array(AppSwitchLibrarySchema).optional(),
});

export type Env = z.infer<typeof ENV_SCHEMA>;
