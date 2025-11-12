const env = import.meta.env.JEST_WORKER_ID ? import.meta.process.env : window;

console.log({ env });
const config = {
  access: {
    url: env.ACCESS_URL,
  },

  graph: {
    url: `${env.GRAPHQL_URL}` || 'http://localhost:3001/api/knowledge/graphql',
  },

  sparql: {
    url: `${env.SPARQL_URL}` || 'http://localhost:3001/api/knowledge/sparql',
  },

  beta: env.BETA === 'true',
  appList: [],
  featureFlags: {
    FF_AUTH_V2: Boolean(env.featureFlags?.FF_AUTH_V2),
  },
  AUTH_V2_CONFIG: env.AUTH_V2_CONFIG,
};

export const getConfig = () => config;
export default config;
