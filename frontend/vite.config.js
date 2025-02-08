import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      protocol: 'ws',
      host: process.env.VITE_PUBLIC_HOST || 'localhost',
      clientPort: 3000,
    },
  },
})
