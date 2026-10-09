import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          reactVendor: ['react', 'react-dom']
        }
      }
    }
  }
});
