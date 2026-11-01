import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {cpSync} from 'node:fs';
import path from 'path';
import {defineConfig} from 'vite';

const legacyAssets = [
  'style.css',
  'app.js',
  'challenges.js',
  'playground.js',
  'excel-simulator.js',
  'downloader.js',
  'jszip.min.js',
  'lessons',
];

function copyLegacyAssets() {
  return {
    name: 'copy-legacy-assets',
    closeBundle() {
      for (const asset of legacyAssets) {
        cpSync(path.resolve(__dirname, asset), path.resolve(__dirname, 'dist', asset), {
          recursive: true,
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copyLegacyAssets()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
