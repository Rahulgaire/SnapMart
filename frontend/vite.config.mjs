import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindForms from '@tailwindcss/forms'
import tailwindcss from '@tailwindcss/vite'
// No need for tailwindcss from @tailwindcss/vite — it doesn't exist.

export default defineConfig({
  plugins: [react(),tailwindcss(),],
   server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1000, // in KB, default is 500
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  }
})
