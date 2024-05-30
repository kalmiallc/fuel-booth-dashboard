<template>
  <n-data-table
    :bordered="false"
    :columns="columns"
    :data="userStore.items"
    :loading="userStore.loading"
    :pagination="{
      ...userStore.pagination,
      prefix: ({ itemCount }) => $t('general.total', { total: itemCount }),
    }"
    @update:page="e => (page = e)"
  />
</template>

<script lang="ts" setup>
import { type DataTableColumns } from 'naive-ui';

const userStore = useUserStore();

onMounted(() => {
  userStore.getUsers();
});

const page = ref(1);
const columns = computed<DataTableColumns<UserInterface>>(() => {
  return [
    {
      key: 'place',
      title: 'Position',
      className: 'text-center',
      minWidth: 50,
      render(_, index) {
        const icon = index === 0 ? 'trophy-gold' : index === 1 ? 'trophy-silver' : 'trophy-bronze';

        if (page.value === 1 && index < 3) {
          return h(
            resolveComponent('NuxtIcon'),
            { name: icon, filled: true, class: 'text-3xl' },
            ''
          );
        } else {
          return h(
            'span',
            { class: 'block text-center pr-2' },
            (page.value - 1) * userStore.pagination.pageSize + index + 1
          );
        }
      },
    },
    {
      key: 'username',
      title: 'Username',
      minWidth: 100,
    },
    {
      key: 'email',
      title: 'Email',
      minWidth: 80,
    },
    {
      key: 'high_score',
      title: 'High score',
      minWidth: 80,
    },
    {
      key: 'damage',
      title: 'Damage',
      minWidth: 80,
    },
    {
      key: 'distance',
      title: 'Distance',
      minWidth: 84,
    },
    {
      key: 'speed',
      title: 'Speed',
      minWidth: 80,
    },
    {
      key: 'time_seconds',
      title: 'Time seconds',
      minWidth: 84,
    },
  ];
});
</script>
