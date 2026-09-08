import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['real-manin-logo.png'],
        manifest: {
          name: 'Real Manin FC',
          short_name: 'Real Manin',
          description: 'Calendario y convocatoria de Real Manin FC',
          theme_color: '#101110',
          background_color: '#f7f7f4',
          display: 'standalone',
          icons: [
            { src: 'real-manin-logo.png', sizes: '640x640', type: 'image/png', purpose: 'any maskable' },
          ],
        },
      }),
    ],
  }
})
