import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensures the server listens on all network interfaces
    port: 3000, // Use the correct port for your server
    hmr: {
      protocol: 'ws', // Use WebSocket for Hot Module Replacement
      host: '192.168.0.242', // Replace this with your server's IP address
      clientPort: 3000, // Ensure this matches the server port
    },
  },
})
