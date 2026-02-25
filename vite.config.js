import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://restapi.amap.com/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        timeout: 10000
      }
    }
  }
})