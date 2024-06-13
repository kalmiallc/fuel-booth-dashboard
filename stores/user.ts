import { defineStore } from 'pinia';
import { userFriendlyMsg } from '~/lib/misc/errors';
import { PAGINATION_LIMIT, WebStorageKeys } from '~/lib/values/general.values';

let abortUser = null as AbortController | null;
let abortUsers = null as AbortController | null;

export const useUserStore = defineStore('user', {
  state: () => ({
    items: [] as Array<UserInterface>,
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
      this.active = {} as UserInterface;
      this.items = [] as UserInterface[];
      this.pagination.page = 1;
      this.pagination.itemCount = 0;
    },

    username(id: string) {
      const player = this.items.find(item => item.username_hash === id);

      return player?.username ? player.username : '';
    },

    /**
     * API calls
     */
    async getUsers(): Promise<UserInterface[]> {
      if (abortUsers) {
        abortUsers.abort();
      }
      abortUsers = new AbortController();

      this.loading = true;

      try {
        const params: Record<string, string | number | Array<any>> = {
          page: 1,
          limit: 100000,
          sortBy: ['high_score'],
          desc: 'true',
        };

        const res = await $api.get<UsersResponse>('/users', params, undefined, {
          signal: abortUsers.signal,
        });

        this.items = res.data.items;
        this.pagination.itemCount = res.data.total;
        this.loading = false;

        return res.data.items;
      } catch (error: any) {
        this.items = [] as Array<UserInterface>;
        this.pagination.itemCount = 0;

        /** Show error message  */
        window.$message.error(userFriendlyMsg(error));
      }

      this.loading = false;
      return [];
    },
  },

  persist: {
    key: WebStorageKeys.USER,
    storage: persistedState.sessionStorage,
    paths: ['active', 'items', 'pagination'],
    debug: true,
  },
});
