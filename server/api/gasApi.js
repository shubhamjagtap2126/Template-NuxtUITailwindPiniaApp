export default defineEventHandler(async (event) => {
  const scriptProdUrl = useRuntimeConfig().server.SCRIPT_PROD_URL;
  // const query = getQuery(event); // Get query parameters from the client request
  const body = await readBody(event);
  const methodId = body?.methodId;
  const payload = body?.payload;

  const methodMap = {
    1: 'read',
    2: 'create',
    3: 'update',
    4: 'delete',
    5: 'signup',
    6: 'login',
    7: 'getCellValue',
    8: 'uploadFilesToDrive',
  };

  const methodName = methodMap[methodId];

  if (!methodName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid methodId',
    });
  }

  try {
    const fetchResponse = `${scriptProdUrl}?params=${encodeURIComponent(
      JSON.stringify({
        method: methodName, // Use the mapped method name
        ...payload, // Send the payload
        clientSecret: useRuntimeConfig().server.GAS_API_SECRET
      })
    )}`;
    // console.log(fetchResponse);
    const response = await $fetch(fetchResponse);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Server/Network error',
    });
  }
});
