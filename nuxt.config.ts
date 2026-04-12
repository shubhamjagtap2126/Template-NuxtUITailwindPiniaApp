import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts', '@vite-pwa/nuxt', '@nuxtjs/color-mode', 'motion-v/nuxt'],
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
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/webp', href: '/favicon.webp', media: '(prefers-color-scheme: dark)' },
        { rel: 'icon', type: 'image/webp', href: '/favicon.webp', media: '(prefers-color-scheme: light)' },
      ],
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
    'driver.js/dist/driver.css',
    'lenis/dist/lenis.css',
  ],
  runtimeConfig: {
    public: {
      SECURELS_SECRET: process.env.SECURELS_SECRET,
      APP_VERSION: pkg.version,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
      googleTranslate: {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'mr', 'hi'],
      },
    },
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // srcDir: 'client/',
  compatibilityDate: '2025-05-15',
  nitro: {
    // preset: 'netlify',
    minify: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: { allowedHosts: [''] },
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'gsap', 'gsap/ScrollTrigger', 'swiper/modules', 'swiper/vue'],
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
