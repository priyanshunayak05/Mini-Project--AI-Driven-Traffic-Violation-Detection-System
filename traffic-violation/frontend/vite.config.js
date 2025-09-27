import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // 👇 put it here instead of a separate object
    historyApiFallback: true
  }
})
