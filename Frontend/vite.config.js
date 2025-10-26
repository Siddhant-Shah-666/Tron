// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        // ✅ This is the crucial part that tells Tailwind where to look
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}", // This scans all your component files
        ],

        darkMode: 'class', // Make sure this is still here for dark mode

        theme: {
          extend: {},
        },
        plugins: [],
      }
    })
  ],
})