import config from '../package.json';
import { WebStorageKeys } from '~/lib/values/general.values';

export default defineNuxtPlugin(nuxtApp => {
  if (typeof window !== 'undefined') {
    versionCheck();
  }
});

function versionCheck() {
  const version = config.version || '1.0.0';

  if (localStorage) {
    const userVersion = localStorage.getItem(WebStorageKeys.APP_VERSION);
    if (!userVersion) {
      localStorage.setItem(WebStorageKeys.APP_VERSION, version);
    } else if (version > userVersion) {
      localStorage.setItem(WebStorageKeys.APP_VERSION, version);
      window.location.reload();
    }
  }
}
