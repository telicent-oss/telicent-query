import react from '@vitejs/plugin-react';
import dns from 'dns';
import { defineConfig } from 'vite';
const FF_AUTH_V2 = process.env.FF_AUTH_V2 === 'true';

dns.setDefaultResultOrder?.('ipv4first');

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
  plugins: [react()],
  base: '/query/',
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      ...(process.env.ACCESS_API_URL_PROXY
        ? {
            '/whoami': {
              target: process.env.ACCESS_API_URL_PROXY,
              changeOrigin: true,
            },
          }
        : {}),
      '/api': {
        target: BASE,
        changeOrigin: true,
        secure: false,
        configure: FF_AUTH_V2 ? undefined : (proxy) => proxy.on('proxyReq', withBearer),
      },
    },
    esbuild: { minify: false },
  },
  build: {
    outDir: './build',
    target: 'esnext',
    rollupOptions: { external: ['/env-config.js'] },
  },

  resolve: {
    alias: {
      // Fix MUI directory import for Vite/Vitest (vite-node)
      '@mui/material/utils': '@mui/material/node/utils/index.js',
      config: '/src/config/',
      lib: '/src/lib',
      components: '/src/components',
    },
  },
});
