import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'images/*.png', 'sounds/*.wav'],
      manifest: {
        name: 'NumberDash Web',
        short_name: 'NumberDash',
        description: 'Juego interactivo de agilidad mental matemática',
        theme_color: '#1a1a2e',
        background_color: '#1a1a2e',
        display: 'standalone',
        icons: [
          {
            src: '/images/LISA.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/LISA.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
