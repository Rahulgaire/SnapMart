import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindForms from '@tailwindcss/forms'
import tailwindcss from '@tailwindcss/vite'
// No need for tailwindcss from @tailwindcss/vite — it doesn't exist.

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
