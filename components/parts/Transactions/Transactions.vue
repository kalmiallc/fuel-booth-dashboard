<script lang="ts" setup>
defineProps({
  title: { type: String, default: 'Transactions' },
  transactions: { type: Array<Transaction>, default: [] },
});
</script>

<template>
  <div>
    <h2 class="text-heading border-b pb-2 font-medium tracking-tight" data-size="2">
      <NuxtIcon name="list" />
      {{ title }}
    </h2>

    <n-virtual-list class="max-h-[40rem] p-4 bg-black" :item-size="60" :items="transactions">
      <template #default="{ item }">
        <TransactionsItem :transaction="item" :key="item.id" />
      </template>
    </n-virtual-list>
  </div>
</template>

<style lang="postcss" module></style>
