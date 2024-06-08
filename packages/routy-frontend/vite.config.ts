import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { config } from 'dotenv'

config()

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
      port: process.env.DEV_PORT ? Number(process.env.DEV_PORT) : 3000,
      host: process.env.DEV_HOST ?? '127.0.0.1',
      watch: {},
    },
    preview: {
      port: process.env.PROD_PORT ? Number(process.env.PROD_PORT) : 3001,
      host: process.env.PROD_HOST ?? '127.0.0.1',
    },
  };
});
