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
};

export const getConfig = () => config;
export default config;
