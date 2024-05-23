import { defineStore } from 'pinia';
import { WebStorageKeys } from '~/lib/values/general.values';

let abortController = null as AbortController | null;

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    jwt: '',
    user: {} as UserInterface,
    username: '',
    email: '',
  }),

  getters: {
    loggedIn(state) {
      return !!state.jwt;
    },
  },

  actions: {
    setUser(user: UserInterface | null) {
      if (!user || !user.id) {
        this.logout(true);
      } else {
        this.user = user;
        this.jwt = user.username_hash;
      }
    },

    /**
     * Refresh profile. Always run on initial load (/plugins/auto-login.ts).
     * Initial profile data is set on login in <UserLoginModal />#walletLogin()
     */
    async refresh(silent = false) {
      try {
        if (abortController) {
          abortController.abort();
        }

        abortController = new AbortController();

        this.loading = !silent;

        const res = await $api.get<UserResponse>(`/users/me`, undefined, undefined, {
          signal: abortController.signal,
        });

        this.setUser(res);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error(e);
          this.logout(true);
        }
      }

      this.loading = false;
    },

    logout(redirect = false) {
      console.log('logout', this.user);
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(WebStorageKeys.USER);
      }
      $api.clearToken();

      if (redirect && typeof window !== 'undefined') {
        window.location.replace('/');
      }
    },
  },

  persist: {
    key: WebStorageKeys.USER,
    storage: persistedState.localStorage,
    paths: ['jwt', 'user'],
    debug: true,
  },
});
