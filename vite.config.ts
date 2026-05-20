import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/

// eslint-disable-next-line max-lines-per-function
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      react({ jsxImportSource: '@emotion/react' }),
      svgrPlugin({ svgrOptions: { icon: true } }),
    ],
    resolve: {
      alias: {
        '@dt-advisory': path.resolve(__dirname, './src'),
        '@': path.resolve(__dirname, './src'),
      },
      preserveSymlinks: false,
    },
    esbuild: {
      // for vite to work with css props
      jsxFactory: 'jsx',
    },
    server: {
      open: false,
      port: 8080,
    },
    build: {
      outDir: 'build',
      rollupOptions: {},
    },
    define: {
      'process.env': process.env,
      VITE_BUILD_NUMBER: process.env.VITE_BUILD_NUMBER,
    },
  });
};
