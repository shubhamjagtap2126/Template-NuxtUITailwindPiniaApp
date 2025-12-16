import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@vite-pwa/nuxt'],
  imports: {
    dirs: ['./client/plugins/**', './client/composables/**'],
  },
  devtools: { enabled: true },
  devServer: { port: 5100 },
  app: {
    head: {
      titleTemplate: '%s | ModernApp',
      meta: [],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      viewport: 'width=device-width, initial-scale=1 maximum-scale=1, user-scalable=no',
    },
  },
  css: ['@/assets/main.css'],
  runtimeConfig: {
    public: { SECURELS_SECRET: process.env.SECURELS_SECRET },
    server: { SCRIPT_PROD_URL: process.env.SCRIPT_PROD_URL, GAS_API_SECRET: process.env.GAS_API_SECRET },
  },
  // srcDir: 'client/',
  compatibilityDate: '2025-05-15',
  nitro: {
    preset: 'netlify',
    minify: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com', 'cdn.quasar.dev', 'images.unsplash.com', 'i.pravatar.cc'],
  },
  pinia: {
    storesDirs: ['./client/stores/**'],
  },
  ui: {},
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      navigateFallback: '/',
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
  },
});
