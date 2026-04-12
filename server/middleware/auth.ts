export default defineEventHandler((event) => {
  // We only want to protect /api/* routes except /api/auth/*
  const path = event.path;
  const isProtectedApiRoute = path.startsWith('/api/');

  if (isProtectedApiRoute) {
    const authHeader = getHeader(event, 'Authorization');
    // console.log('authHeader', authHeader);

    if (!authHeader && useRuntimeConfig().JWT_SECRET) {
      // console.log('No token found');
      return;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, message: 'You are not authorized to access' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      console.log('Invalid or expired token');
      throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }
    // Attach user payload to context
    event.context.user = decoded;
  }
});
