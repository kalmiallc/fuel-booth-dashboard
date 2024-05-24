export default defineNuxtRouteMiddleware(_ => {
  if (process?.server) {
    return;
  }
});
