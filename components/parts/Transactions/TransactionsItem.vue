<script lang="ts" setup>
defineProps({
  transaction: { type: Object as PropType<Transaction>, required: true },
});
</script>

<template>
  <div class="mb-6">
    <a
      :href="`https://app.fuel.network/tx/${transaction.id}/simple`"
      class="text-dark-text no-underline"
      target="_blank"
    >
      <div
        class="flex justify-between items-center gap-4 p-4 bg-dark-overlay border-1 border-border rounded-md text-dark-text"
      >
        <div class="rt-Box fuel-Box flex h-[26px] gap-3">
          <span class="bg-dark-tag rounded-lg text-xs p-1"> Script </span>
          <span class="font-mono">
            <TableEllipsis :text="transaction.id.toString()" />
          </span>
        </div>
        <div class="flex items-center gap-3 whitespace-nowrap">
          <span data-icon="true" class="flex items-center gap-1 text-sm">
            <NuxtIcon name="gas" />
            0.000005493 ETH
          </span>
          <span data-accent-color="green" class="bg-green text-xs p-1 rounded-lg text-dark-bg">
            Success
          </span>
          <span class="rt-Text fuel-Text rt-r-size-3 text-sm">a few seconds ago</span>
        </div>
      </div>
    </a>
  </div>
</template>
