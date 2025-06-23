import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import json from '@rollup/plugin-json'; // Yeni ekle

export default defineConfig({
  plugins: [
    react(),
    json() // Bu satırı ekleyin
  ],
  build: {
    rollupOptions: {
      plugins: [json()] // Buraya da ekleyin
    }
  }
});
