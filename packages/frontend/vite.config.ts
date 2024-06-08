import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig(() => {
  const resolve = {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@styled-system': path.resolve(__dirname, './src/styled-system'),
    },
  };

  return {
    resolve,
    publicDir: './public',
    plugins: [react(), TanStackRouterVite()],
    server: {
      port: 3000,
      host: '192.168.0.80',
      watch: {},
    },
    preview: {
      port: 3001,
      host: '127.0.0.1',
    },
  };
});
