import { defineConfig } from 'vite';

const FF_AUTH_V2 = process.env.FF_AUTH_V2 === 'true';

const buildAuthHeader = () => {
  if (FF_AUTH_V2) return null; // do not set static bearer
  const raw = process.env.TC_OIDC_TOKEN;
  if (!raw) return null;
  return raw.startsWith('Bearer ') ? raw : `Bearer ${raw}`;
};

const withBearer = (proxyReq) => {
  const header = buildAuthHeader();
  if (header) proxyReq.setHeader('Authorization', header);
};

const BASE = process.env.REACT_DEV_SYSTEM_INTEGRATION_URL || 'http://127.0.0.1:8000';

export default defineConfig({
  resolve: {
    alias: {
      components: '/src/components',
      lib: '/src/lib',
      config: '/src/config',
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: BASE,
        changeOrigin: true,
        secure: false,
        configure: FF_AUTH_V2 ? undefined : (proxy) => proxy.on('proxyReq', withBearer),
      },
    },
  },
});
