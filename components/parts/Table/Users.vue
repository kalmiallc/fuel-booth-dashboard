<template>
  <n-data-table
    :bordered="false"
    :columns="columns"
    :data="userStore.items.slice(0, 10)"
    :loading="userStore.loading"
    :pagination="false"
    @update:page="e => (userStore.pagination.page = e)"
  />
</template>

<script lang="ts" setup>
import TrophyGold from '~/assets/icons/trophy-gold.svg';
import TrophySilver from '~/assets/icons/trophy-silver.svg';
import TrophyBronze from '~/assets/icons/trophy-bronze.svg';
import { type DataTableColumns } from 'naive-ui';

const userStore = useUserStore();

onMounted(() => {
  userStore.getUsers();
});

const columns = computed<DataTableColumns<UserInterface>>(() => {
  return [
    {
      key: 'place',
      title: 'Position',
      className: 'text-center',
      minWidth: 50,
      render(_, index) {
        if (userStore.pagination.page === 1 && index < 3) {
          const imgSrc = index === 0 ? TrophyGold : index === 1 ? TrophySilver : TrophyBronze;
          return h('img', { src: imgSrc, class: 'text-3xl' }, '');
        } else {
          return h(
            'span',
            { class: 'block text-center pr-2' },
            (userStore.pagination.page - 1) * userStore.pagination.pageSize + index + 1
          );
        }
      },
    },
    {
      key: 'username',
      title: 'Player',
      minWidth: 100,
    },
    {
      key: 'high_score',
      title: 'Score',
      minWidth: 80,
    },
    {
      key: 'time_seconds',
      title: 'Time seconds',
      minWidth: 84,
    },
    {
      key: 'damage',
      title: 'Health',
      minWidth: 80,
    },
  ];
});
</script>
