import { Env, ENV_SCHEMA } from './env.schema';
import { renderErrorForReleaseEngineer } from '../../lib/renderErrorForReleaseEngineer';

export const getEnv = () => {
  const env = import.meta.env.JEST_WORKER_ID
    ? (import.meta as unknown as { process: { env: Env } }).process.env
    : window;

  try {
    return ENV_SCHEMA.parse(env as Env);
  } catch (error) {
    renderErrorForReleaseEngineer(error, 'ENV_SCHEMA');
    throw error;
  }
};
