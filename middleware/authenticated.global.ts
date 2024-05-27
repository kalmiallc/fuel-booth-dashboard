export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore();

  if (process?.server) {
    return;
  }

  if (!authStore.loggedIn && to.name !== 'index') {
    return navigateTo('/', { redirectCode: 301 });
  }
});
