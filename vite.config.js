import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Changed from @vitejs/plugin-react
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // Now using react-swc
    tailwindcss()
  ]
})