import { defineStore } from 'pinia';
import { userFriendlyMsg } from '~/lib/misc/errors';
import { PAGINATION_LIMIT, WebStorageKeys } from '~/lib/values/general.values';

let abortController = null as AbortController | null;

export const usePlayerStore = defineStore('player', {
  state: () => ({
    items: [] as Array<PlayerInterface>,
    loading: false,
    pagination: {
      page: 1,
      pageSize: PAGINATION_LIMIT,
      itemCount: 0,
    },
  }),

  getters: {},

  actions: {
    resetData() {
      this.items = [] as PlayerInterface[];
      this.pagination.page = 1;
      this.pagination.itemCount = 0;
    },

    /**
     * API calls
     */

    async getPlayers(): Promise<PlayerInterface[]> {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();

      this.loading = true;
      try {
        const res = await $api.get<PlayersResponse>('/players', undefined, undefined, {
          signal: abortController.signal,
        });

        this.items = res.data.decoded_users;
        this.pagination.itemCount = res.data.decoded_users.length;
        this.loading = false;

        return res.data.decoded_users;
      } catch (error: any) {
        this.items = [] as Array<PlayerInterface>;
        this.pagination.itemCount = 0;

        /** Show error message  */
        window.$message.error(userFriendlyMsg(error));
      }

      this.loading = false;
      return [];
    },
  },

  persist: {
    key: WebStorageKeys.PLAYER,
    storage: persistedState.sessionStorage,
    paths: ['items', 'pagination'],
    debug: true,
  },
});
