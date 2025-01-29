import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/query',
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    {
      name: 'add headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Add headers to all responses
          req.headers['Authorization'] = process.env.TC_OIDC_TOKEN;
          next(); // Pass control to the next middleware or route
        });
      },
    },
  ],
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
        target: process.env.REACT_DEV_SYSTEM_INTEGRATION_URL,
        changeOrigin: true,
      },
    },
  },
});
