import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // Puerto fijo: 5173 suele estar ocupado por otros proyectos.
    port: 5185,
    strictPort: true,
    allowedHosts: ['.bakano.ec', '.trycloudflare.com'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Solo tokens y mixins: se antepone a CADA <style lang="scss">.
        // Todo lo que emite CSS vive en global.scss (importado una vez en main.ts).
        additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: { target: 'esnext' },
})
