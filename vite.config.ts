import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

// A build id baked into the JS and written to version.json, so an open or
// cached page can tell when a newer version has been published.
const BUILD_ID = String(Date.now())
const versionFile: Plugin = {
  name: 'version-file',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ id: BUILD_ID }) })
  },
}

// Two invitations, two links, one component tree.
// Each event has its own HTML entry so the Open Graph tags (what WhatsApp
// shows in the link preview) are correct per link without any server logic.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), versionFile],
  define: { __BUILD_ID__: JSON.stringify(BUILD_ID) },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        shaadi: resolve(import.meta.dirname, 'shaadi/index.html'),
        walima: resolve(import.meta.dirname, 'walima/index.html'),
      },
    },
    assetsInlineLimit: 0,
  },
})
