import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Two invitations, two links, one component tree.
// Each event has its own HTML entry so the Open Graph tags (what WhatsApp
// shows in the link preview) are correct per link without any server logic.
export default defineConfig({
  plugins: [react()],
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
