import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/', // 基础路径，GitHub Pages部署时如果是子路径需要修改
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