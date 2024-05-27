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

defineProps({
  title: { type: String, default: 'Transactions' },
  events: { type: Array<GameEvent>, default: [] },
});

const columns = computed<DataTableColumns<GameEvent>>(() => {
  return [
    {
      key: 'id',
      title: 'ID',
      render(row: GameEvent) {
        return h(resolveComponent('TableEllipsis'), { text: row.id }, '');
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
</script>
