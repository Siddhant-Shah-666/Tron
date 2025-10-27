// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        darkMode: 'class',
        theme: { extend: {} },
        plugins: [],
      },
    }),
  ],

  // ✅ Build output folder for Render
  build: {
    outDir: "dist",
  },

  // ✅ This ensures Vite serves index.html for unknown routes in dev mode
  preview: {
    port: 4173,
  },
})
