<template>
  <n-data-table
    :bordered="false"
    :columns="columns"
    :data="data"
    :loading="playerStore.loading"
    :pagination="{
      pageSize: playerStore.pagination.pageSize,
      prefix: ({ itemCount }) => $t('general.total', { total: itemCount }),
    }"
    @update:page="e => (playerStore.pagination.page = e)"
  />
</template>

<script lang="ts" setup>
import { type DataTableColumns } from 'naive-ui';

interface Player extends PlayerInterface, UserInterface {}

const playerStore = usePlayerStore();
const userStore = useUserStore();

onMounted(() => {
  playerStore.getPlayers();
});

const data = computed(() => {
  return playerStore.items.map(player => {
    const user = userStore.items.find(item => item.player_contract_index_id === player.playerId);
    return { ...player, ...user };
  });
});

const columns = computed<DataTableColumns<Player>>(() => {
  return [
    {
      key: 'place',
      title: 'Position',
      className: 'text-center',
      minWidth: 40,
      render(_, index) {
        const icon = index === 0 ? 'trophy-gold' : index === 1 ? 'trophy-silver' : 'trophy-bronze';

        if (playerStore.pagination.page === 1 && index < 3) {
          return h(
            resolveComponent('NuxtIcon'),
            { name: icon, filled: true, class: 'text-3xl' },
            ''
          );
        } else {
          return h(
            'span',
            { class: 'block text-center pr-2' },
            (playerStore.pagination.page - 1) * playerStore.pagination.pageSize + index + 1
          );
        }
      },
    },
    {
      key: 'username',
      title: 'Username',
      minWidth: 120,
    },
    {
      key: 'email',
      title: 'Email',
      minWidth: 120,
    },
    {
      key: 'highScore',
      title: 'High score',
      minWidth: 120,
    },
    {
      key: 'score_type',
      title: 'Score type',
    },
    {
      key: 'damage',
      title: 'Damage',
    },
    {
      key: 'distance',
      title: 'Distance',
    },
    {
      key: 'speed',
      title: 'Speed',
    },
    {
      key: 'time_seconds',
      title: 'Time seconds',
    },
  ];
});
</script>
