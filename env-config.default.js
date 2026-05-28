// envsubst template. Bootstrapped to env-config.js on first `yarn dev`/`yarn build`
// via scripts/cp-config.js.sh. Edit env-config.js (gitignored) for local backends;
// keep this file as the source of truth for fresh clones.
//
// Required exports: API_HOST_DOMAIN, APP_HOST_DOMAIN, AUTH_HOST_DOMAIN.
// Optional exports: MAP_TILER_TOKEN, ARC_GIS_API_TOKEN.
// See https://telicent.atlassian.net/wiki/x/BICSNw for values.

window.GRAPHQL_URL = 'https://${API_HOST_DOMAIN}/sparql/knowledge';

window.SPARQL_URL = 'https://${API_HOST_DOMAIN}/sparql/knowledge/sparql';

window.ACCESS_URL = 'http://localhost:3001/api/access';

window.MAP_TILER_TOKEN = '${MAP_TILER_TOKEN}';

window.ARC_GIS_API_TOKEN = '${ARC_GIS_API_TOKEN}';

window.featureFlags = {
  FF_AUTH_V2: true,
};

window.AUTH_V2_CONFIG = {
  authServerUrl: 'https://${AUTH_HOST_DOMAIN}',
  clientId: 'local-query-ui',
  scope: 'openid profile offline_access',
  redirectUri: 'http://localhost:3001/query/callback',
  popupRedirectUri: 'http://localhost:3001/query/auth-redirect-uri',
};

window.APP_SWITCH_LIBRARY = [
  {
    id: 'telicent-graph',
    name: 'graph',
    url: 'https://${APP_HOST_DOMAIN}/graph/',
    icon: '/query/assets/icons/GraphDark.svg',
  },
  {
    id: 'telicent-user-portal',
    name: 'user portal',
    url: 'https://${APP_HOST_DOMAIN}/user-portal/',
    icon: '/query/assets/icons/UserPortalDark.svg',
  },
  {
    id: 'telicent-search',
    name: 'search',
    url: 'https://${APP_HOST_DOMAIN}/search/',
    icon: '/query/assets/icons/SearchDark.svg',
  },
  {
    id: 'telicent-catalog',
    name: 'catalog',
    url: 'https://${APP_HOST_DOMAIN}/data-catalog/',
    icon: '/query/assets/icons/CatalogDark.svg',
  },
];
