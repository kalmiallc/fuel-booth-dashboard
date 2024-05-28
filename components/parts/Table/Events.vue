<template>
  <n-data-table
    :bordered="false"
    :columns="columns"
    :data="events"
    :pagination="{
      pageSize: PAGINATION_LIMIT,
      prefix: ({ itemCount }) => $t('general.total', { total: itemCount }),
    }"
  />
</template>

<script lang="ts" setup>
import { type DataTableColumns } from 'naive-ui';
import { PAGINATION_LIMIT } from '~/lib/values/general.values';

defineProps({
  title: { type: String, default: 'Transactions' },
  events: { type: Array<GameEvent>, default: [] },
});

const playerStore = usePlayerStore();

const columns = computed<DataTableColumns<GameEvent>>(() => {
  return [
    {
      key: 'id',
      title: 'Username',
      render(row: GameEvent) {
        return h(
          resolveComponent('TableEllipsis'),
          { text: username(row.id), style: { 'text-rendering': 'optimizeSpeed' } },
          ''
        );
      },
    },
    {
      key: 'damage',
      title: 'Damage',
      minWidth: 100,
    },
    {
      key: 'distance',
      title: 'Distance',
      minWidth: 100,
    },
    {
      key: 'speed',
      title: 'Speed',
      minWidth: 100,
    },
    {
      key: 'time',
      title: 'Time seconds',
      minWidth: 100,
    },
  ];
});

const username = (id: string) => {
  const player = playerStore.items.find(item => item.username_hash === id);
  // const user = userStore.items.find(item => item.username_hash === id);

  return player?.username ? player.username : id;
};
</script>
