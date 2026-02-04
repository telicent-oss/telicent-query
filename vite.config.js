import react from '@vitejs/plugin-react';
import dns from 'dns';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder?.('ipv4first');

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['graphiql'],
  },
  base: '/query',
  server: {
    port: 3001,
    strictPort: true,
    esbuild: { minify: false },
  },
  build: {
    outDir: './build',
    emptyOutDir: true,
    rollupOptions: { external: ['env-config.js'] },
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
