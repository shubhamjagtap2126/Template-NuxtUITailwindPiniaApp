import { createClient } from '@supabase/supabase-js';
export default defineEventHandler(async (event) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw createError({ statusCode: 404, statusMessage: 'File not found' });

  const body = await readBody(event);
  const { filePath } = body;
  // console.log(filePath);

  try {
    // For Public Bucket
    const data = await $fetch(`${useRuntimeConfig().SUPABASE_STORAGE_URL}/${filePath}`);
    // console.log(data);
    // For Private Bucket
    // const { SUPABASE_URL, SUPABASE_API_KEY } = useRuntimeConfig();
    // const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
    // const { data, error } = await supabase.storage.from('superparents').createSignedUrl(`activityFiles/${filePath}.html`, 3600);
    // .list(`activityFiles/${filePath}`);
    // console.log(data);
    return encryptPayload(data);
  } catch (err) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' });
  }
});
