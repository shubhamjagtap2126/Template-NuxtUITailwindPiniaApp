import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GTM');

  // Add GTM script to the head
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtm.js?id=GTM`;
  script.async = true;
  document.head.appendChild(script);
});
