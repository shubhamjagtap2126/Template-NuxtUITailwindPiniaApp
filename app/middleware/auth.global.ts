export default defineNuxtRouteMiddleware((to) => {
  // const authStore = useAuthStore()

  // const protectedRoutes = ['/user', '/article', '/category', '/payments', '/dashboard', '/news'];

  // if (import.meta.client && isProtectedRoute(protectedRoutes, to) && !authStore.isAuthenticated) {
  //   return navigateTo('/auth');
  // }

  // if (import.meta.client && authStore.isAuthenticated && to.path === '/auth') {
  //   return navigateTo('/news');
  // }

  // if (authStore.isAuthenticated && !authStore.isAdmin && to.path === '/dashboard') {
  //   return navigateTo('/user');
  // }
});
