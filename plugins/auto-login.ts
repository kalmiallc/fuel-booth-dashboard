export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  if (authStore.jwt) {
    $api.setToken(authStore.jwt);
    authStore.refresh();
  } else {
    authStore.logout();
  }
});
