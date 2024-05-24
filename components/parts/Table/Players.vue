<template>
  <n-data-table
    :bordered="false"
    :columns="columns"
    :data="playerStore.items"
    :loading="playerStore.loading"
    :pagination="{
      pageSize: playerStore.pagination.pageSize,
      prefix: ({ itemCount }) => $t('general.total', { total: itemCount }),
    }"
  />
</template>

<script lang="ts" setup>
import { type DataTableColumns } from 'naive-ui';

const playerStore = usePlayerStore();

const columns = computed<DataTableColumns<PlayerInterface>>(() => {
  return [
    {
      key: 'playerId',
      title: 'Id',
      minWidth: 50,
    },
    {
      key: 'username',
      title: 'username',
      minWidth: 120,
    },
    {
      key: 'highScore',
      title: 'highScore',
      minWidth: 120,
    },
    {
      key: 'username_and_email_hash',
      title: 'username_and_email_hash',
      render(row: PlayerInterface) {
        return h(resolveComponent('TableEllipsis'), { text: row.username_and_email_hash }, '');
      },
    },
    {
      key: 'username_hash',
      title: 'username_hash',
      render(row: PlayerInterface) {
        return h(resolveComponent('TableEllipsis'), { text: row.username_hash }, '');
      },
    },
  ];
});
</script>
