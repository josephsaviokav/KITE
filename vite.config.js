import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getSong': {
        target: 'http://localhost:3001', // or whatever port your backend runs on
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
