<script lang="ts" setup>
const props = defineProps({
  title: { type: String, default: 'Transactions' },
  transactions: { type: Array<GameEvent>, default: [] },
});

const oldTransactions = ref<GameEvent[]>([]);
const newRows = ref<string[]>([]);

watch(
  () => props.transactions,
  events => {
    if (oldTransactions.value.length) {
      events.forEach(item => {
        const event = oldTransactions.value.find(e => item.id === e.id);
        if (!event) {
          newRows.value.push(item.id);
        }
      });
    }
    oldTransactions.value = JSON.parse(JSON.stringify(events));

    if (newRows.value.length) {
      setTimeout(() => (newRows.value = []), 1000);
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h3 class="mb-4">
      {{ title }}
    </h3>

    <div class="flex justify-between items-center gap-4 p-4 text-base">
      <div class="w-1/4">Transaction ID</div>
      <div class="w-1/5">Username</div>
      <div class="w-1/5">Time</div>
      <div class="w-1/5">Health</div>
    </div>

    <n-virtual-list
      v-if="transactions.length"
      class="max-h-[40rem]"
      :item-size="90"
      :items="transactions"
    >
      <template #default="{ item }: { item: GameEvent }">
        <TransactionsItem
          v-if="item"
          :event="item"
          :key="item.id"
          :class="{ flash: newRows.includes(item.id) }"
        />
        <div v-else></div>
      </template>
    </n-virtual-list>
  </div>
</template>

<style lang="postcss" module></style>
