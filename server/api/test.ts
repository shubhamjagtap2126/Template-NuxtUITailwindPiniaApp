export default defineEventHandler(async (event) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // throw createError({ statusCode: 404, statusMessage: 'File not found' });

  // const ip = getRequestIP(event, { xForwardedFor: true });
  // console.log(ip);
  // const { body, params, query, method } = await readBody(event);
  // console.log('body', body, 'params', params, 'query', query, 'method', method);
  switch (event.method) {
    case 'GET':
      return 'Hello World';
    case 'POST':
      const { body, params, query, method } = await readBody(event);
      return 'Hello World';
    case 'PUT':
      return 'Hello World';
    case 'DELETE':
      return 'Hello World';
    default:
      return 'Hello World';
  }
});
