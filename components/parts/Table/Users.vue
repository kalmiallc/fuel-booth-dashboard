<template>
  <n-data-table
    remote
    :bordered="false"
    :columns="columns"
    :data="userStore.items"
    :loading="userStore.loading"
    :pagination="{
      ...userStore.pagination,
      prefix: ({ itemCount }) => $t('general.total', { total: itemCount }),
    }"
    @update:page="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { type DataTableColumns } from 'naive-ui';

const userStore = useUserStore();

const columns = computed<DataTableColumns<UserInterface>>(() => {
  return [
    {
      key: 'username',
      title: 'Username',
    },
    {
      key: 'email',
      title: 'Email',
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
      key: 'high_score',
      title: 'High score',
    },
    {
      key: 'score_type',
      title: 'score_type',
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

/** On page change, load data */
async function handlePageChange(page: number) {
  await userStore.getUsers(page);
  userStore.pagination.page = page;
}
</script>
