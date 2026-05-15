import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist-electron/main',
      rollupOptions: {
        input: { index: path.resolve(__dirname, 'src/main/main.ts') },
      },
    },
    resolve: {
      alias: {
        '@main': path.resolve(__dirname, 'src/main'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist-electron/preload',
      rollupOptions: {
        input: { index: path.resolve(__dirname, 'src/main/preload.ts') },
      },
    },
  },
  renderer: {
    root: 'src/renderer',
    build: {
      outDir: '../../dist',
      rollupOptions: {
        input: path.resolve(__dirname, 'src/renderer/index.html'),
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@engine': path.resolve(__dirname, 'src/engine'),
        '@story': path.resolve(__dirname, 'src/story'),
        '@components': path.resolve(__dirname, 'src/renderer/components'),
        '@screens': path.resolve(__dirname, 'src/renderer/screens'),
        '@hooks': path.resolve(__dirname, 'src/renderer/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    server: {
      port: 5173,
    },
  },
});
