/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'happy-dom',
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
);
