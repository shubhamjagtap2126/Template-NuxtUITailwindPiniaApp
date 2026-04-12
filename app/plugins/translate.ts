export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const options = config.public.googleTranslate || {};

  const defaultLanguage = options.defaultLanguage || 'en';
  const supportedLanguages = options.supportedLanguages || ['en', 'hi', 'mr', 'gu'];
  const activeLanguage = ref(defaultLanguage);
  const isLoaded = ref(false);

  // Initialize lang from cookie
  if (import.meta.client) {
    const cookieLang = document.cookie
      .split('; ')
      .find((row) => row.startsWith('googtrans='))
      ?.split('=')[1]
      ?.split('/')[2];

    if (cookieLang && supportedLanguages.includes(cookieLang)) {
      activeLanguage.value = cookieLang;
    }
  }

  const setLanguage = (lang) => {
    if (!supportedLanguages.includes(lang)) return;

    if (lang === defaultLanguage) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      if (activeLanguage.value !== defaultLanguage) {
        window.location.reload();
      }
      activeLanguage.value = defaultLanguage;
      return;
    }

    if (lang !== activeLanguage.value) {
      activeLanguage.value = lang;
      document.cookie = `googtrans=/en/${lang};path=/;`;
      document.cookie = `googtrans=/en/${lang};path=/; domain=${window.location.hostname};`;

      if (isLoaded.value) {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = lang;
          select.dispatchEvent(new Event('change'));
        }
      } else {
        // If not loaded yet, the init function will handle it
      }
    }
  };

  const initWidget = () => {
    if (!window.google?.translate?.TranslateElement) return;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: defaultLanguage,
        includedLanguages: supportedLanguages.join(','),
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
      },
      'nuxt_translate_element',
    );

    isLoaded.value = true;

    // Sync if language was set before load
    if (activeLanguage.value !== defaultLanguage) {
      setTimeout(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = activeLanguage.value;
          select.dispatchEvent(new Event('change'));
        }
      }, 500);
    }
  };

  if (import.meta.client) {
    window.googleTranslateElementInit = initWidget;

    nuxtApp.hook('app:mounted', () => {
      if (document.querySelector('#google-translate-script')) return;

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  }

  return {
    provide: {
      googleTranslate: {
        activeLanguage: readonly(activeLanguage),
        supportedLanguages,
        setLanguage,
        isLoaded: readonly(isLoaded),
      },
    },
  };
});
