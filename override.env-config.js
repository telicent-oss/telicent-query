window.GRAPHQL_URL = 'http://localhost:3000/graph/knowledge';

window.SPARQL_URL = 'http://localhost:3000/graph/knowledge/sparql';

window.ACCESS_URL = 'http://localhost:8091';
// For MAP_TILER_TOKEN see ./sensitive/secret-config.js

window.featureFlags = {
  FF_AUTH_V2: true,
};

window.AUTH_V2_CONFIG = {
  authServerUrl: 'http://auth.telicent.localhost',
  clientId: 'telicent-query-ui',
  scope: 'openid profile offline_access',
  redirectUri: 'http://localhost:3001',
  popupRedirectUri: 'http://localhost:3001/query/auth-redirect-uri',
};
