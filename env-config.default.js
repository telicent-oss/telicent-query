// Sandbox defaults. Bootstrapped to env-config.js on first `yarn dev`/`yarn build`.
// Edit env-config.js (gitignored) for local backends; keep this file as the
// source of truth for fresh clones.

window.GRAPHQL_URL =
  'https://api.system-integration.telicent-sandbox.telicent.live/sparql/knowledge';

window.SPARQL_URL =
  'https://api.system-integration.telicent-sandbox.telicent.live/sparql/knowledge/sparql';

window.ACCESS_URL = 'http://localhost:3001/api/access';

window.featureFlags = {
  FF_AUTH_V2: true,
};

window.AUTH_V2_CONFIG = {
  authServerUrl: 'https://auth.system-integration.telicent-sandbox.telicent.live',
  clientId: 'local-query-ui',
  scope: 'openid profile offline_access',
  redirectUri: 'http://localhost:3001/query/callback',
  popupRedirectUri: 'http://localhost:3001/query/auth-redirect-uri',
};

window.APP_SWITCH_LIBRARY = [
  {
    id: 'telicent-graph',
    name: 'graph',
    url: 'https://apps.system-integration.telicent-sandbox.telicent.live/graph/',
    icon: '/query/assets/icons/GraphDark.svg',
  },
  {
    id: 'telicent-user-portal',
    name: 'user portal',
    url: 'https://apps.system-integration.telicent-sandbox.telicent.live/user-portal/',
    icon: '/query/assets/icons/UserPortalDark.svg',
  },
  {
    id: 'telicent-search',
    name: 'search',
    url: 'https://apps.system-integration.telicent-sandbox.telicent.live/search/',
    icon: '/query/assets/icons/SearchDark.svg',
  },
  {
    id: 'telicent-catalog',
    name: 'catalog',
    url: 'https://apps.system-integration.telicent-sandbox.telicent.live/data-catalog/',
    icon: '/query/assets/icons/CatalogDark.svg',
  },
];
