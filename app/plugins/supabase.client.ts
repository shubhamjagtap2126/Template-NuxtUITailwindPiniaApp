// import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // if (!config.public.SUPABASE_URL || !config.public.SUPABASE_PUBLISHABLE_KEY) {
  //   console.warn('Supabase credentials not found in runtime config.');
  //   return;
  // }
  // const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_PUBLISHABLE_KEY);

  // nuxtApp.provide('supabase', supabase);
});
