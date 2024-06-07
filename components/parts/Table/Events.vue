<template>
  <n-data-table
    :bordered="false"
    :columns="columns"
    :class="tableClasses"
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

const props = defineProps({
  title: { type: String, default: 'Transactions' },
  events: { type: Array<GameEvent>, default: [] },
});

const oldEvents = ref<GameEvent[]>([]);
const playerStore = usePlayerStore();

const newRows = ref<number[]>([0, 1]);

const tableClasses = computed(() => {
  return newRows.value.map(i => `flash-row-${i}`);
});

const columns = computed<DataTableColumns<GameEvent>>(() => {
  return [
    {
      key: 'id',
      title: 'Username',
      render(row: GameEvent, index: number) {
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
      render(row: GameEvent) {
        return row.time > 1000 ? Math.round(row.time / 1000) : row.time;
      },
    },
  ];
});

watch(
  () => props.events,
  events => {
    if (oldEvents.value.length) {
      events.forEach((item, key) => {
        const event = oldEvents.value.find(e => item.id === e.id);
        if (!event) {
          newRows.value.push(key + 1);
        }
      });
    }
    oldEvents.value = JSON.parse(JSON.stringify(events));
    setTimeout(() => (newRows.value = []), 2000);
  },
  { deep: true }
);

const username = (id: string) => {
  const player = playerStore.items.find(item => item.username_hash === id);
  // const user = userStore.items.find(item => item.username_hash === id);

  return player?.username ? player.username : id;
};
</script>

<style lang="postcss">
@for $i from 1 to 10 {
  .flash-row-$i .n-data-table-table .n-data-table-tr:nth-child($i) td {
    animation: flash 1s;
  }
}

@keyframes flash {
  0%,
  100% {
    @apply bg-transparent;
  }
  50% {
    @apply bg-green;
  }
}
</style>
