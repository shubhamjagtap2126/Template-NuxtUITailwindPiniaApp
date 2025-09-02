export default defineNuxtRouteMiddleware((to) => {
  const user = { role: 'user' };

  // if (['/contact', '/test', '/easebuzz/*.*'].includes(to.path)) {
  //   return;
  // }

  // if (to.path === '/user' && !user) {
  //   return navigateTo('/auth');
  // }

  // if (user) {
  //   if (to.path === '/auth' || to.path === '/') {
  //     return navigateTo('/user');
  //   }
  //   if (to.path.startsWith('/vendor') && !['vendor', 'SAdmin', 'admin'].includes(user.role)) {
  //     return navigateTo('/user'); // Unauthorized access to vendor section
  //   }
  //   return; // Let the navigation continue
  // }
});
