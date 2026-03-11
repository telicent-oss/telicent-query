window.GRAPHQL_URL = 'http://localhost:3000/graph/knowledge';

window.SPARQL_URL = 'http://localhost:3000/graph/knowledge/sparql';

window.ACCESS_URL = 'http://localhost:8091';
// For MAP_TILER_TOKEN see ./sensitive/secret-config.js

window.featureFlags = {
  FF_AUTH_V2: true,
};

window.USER_PORTAL_URL = 'https://localhost:3000';
window.GRAPH_APP_URL = 'https://localhost:3000';
window.CATALOG_APP_URL = 'https://localhost:3000';

window.AUTH_V2_CONFIG = {
  authServerUrl: 'http://auth.telicent.localhost',
  clientId: 'telicent-query-ui',
  scope: 'openid profile offline_access',
  redirectUri: 'http://localhost:3001',
  popupRedirectUri: 'http://localhost:3001/query/auth-redirect-uri',
};

window.APP_SWITCH_LIBRARY = [
  {
    id: 'telicent-user-portal',
    name: 'user portal',
    url: window.USER_PORTAL_URL,
    icon: '/query/assets/icons/UserPortalDark.svg',
  },
  {
    id: 'telicent-graph',
    name: 'graph',
    url: window.GRAPH_APP_URL,
    icon: '/query/assets/icons/GraphDark.svg',
  },
  {
    id: 'telicent-catalog',
    name: 'catalog',
    url: window.CATALOG_APP_URL,
    icon: '/query/assets/icons/CatalogDark.svg',
  },
];
