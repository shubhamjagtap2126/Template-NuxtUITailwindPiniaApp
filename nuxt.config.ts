import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@vite-pwa/nuxt', '@nuxtjs/color-mode'],
  imports: {
    dirs: ['plugins', 'composables', 'stores'],
  },
  devtools: { enabled: true },
  devServer: { port: 5100 },
  app: {
    head: {
      titleTemplate: '%s | ModernApp',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'description', content: 'ModernApp' }],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      viewport: 'width=device-width, initial-scale=1 maximum-scale=1, user-scalable=no',
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  css: [
    '@/assets/main.css',
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    'swiper/css/effect-coverflow',
    'swiper/css/effect-cards',
    'swiper/css/effect-cube',
    'swiper/css/effect-creative',
  ],
  runtimeConfig: {
    public: { SECURELS_SECRET: process.env.SECURELS_SECRET },
    server: { APP_SECRET: process.env.APP_SECRET, MONGODB_URI_DEV: process.env.MONGODB_URI_DEV, MONGODB_URI_PROD: process.env.MONGODB_URI_PROD },
  },
  // srcDir: 'client/',
  compatibilityDate: '2025-05-15',
  nitro: {
    // preset: 'netlify',
    minify: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['114.29.230.248', 'petopia.esakal.com', '192.168.200.75', 'localhost:5100'],
    },
  },
  image: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com', 'res.cloudinary.com', 'cdn.quasar.dev', 'images.unsplash.com', 'picsum.photos', 'i.pravatar.cc'], // Allowed image domains
  },
  pinia: {
    storesDirs: ['stores'],
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
