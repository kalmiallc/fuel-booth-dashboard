import { defineStore } from 'pinia';
import { userFriendlyMsg } from '~/lib/misc/errors';
import { PAGINATION_LIMIT, WebStorageKeys } from '~/lib/values/general.values';

let abortController = null as AbortController | null;

export const useBalanceStore = defineStore('balance', {
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
      this.items = [] as UserInterface[];
      this.pagination.page = 1;
      this.pagination.itemCount = 0;
    },

    /**
     * API calls
     */

    async getBalance(page?: number): Promise<UserInterface[]> {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();

      this.loading = true;

      try {
        const params: Record<string, string | number> = {
          page: page || 1,
          limit: PAGINATION_LIMIT,
          orderBy: 'createTime',
          desc: 'true',
        };

        const res = await $api.get<UsersResponse>('/balance', params, undefined, {
          signal: abortController.signal,
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
    key: WebStorageKeys.BALANCE,
    storage: persistedState.sessionStorage,
    paths: ['items', 'pagination'],
    debug: true,
  },
});
