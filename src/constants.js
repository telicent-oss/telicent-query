import z from 'zod';

import appConfigJson from './app.config.json';
import { renderErrorForReleaseEngineer } from './lib/renderErrorForReleaseEngineer';

export const APP_CONFIG_JSON_SCHEMA = z.object({
  name: z.string(),
  repo_name: z.string(),
  app_name: z.string(),
  app_name_snake_case: z.string(),
  'uri-basename': z.string(),
  brandColor: z.string(),
});

export const APP_CONFIG_JSON = (() => {
  try {
    return APP_CONFIG_JSON_SCHEMA.parse(appConfigJson);
  } catch (error) {
    renderErrorForReleaseEngineer(error, 'APP_CONFIG_JSON');
    throw error;
  }
})();
