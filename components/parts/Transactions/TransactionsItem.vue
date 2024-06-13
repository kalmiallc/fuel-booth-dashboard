<script lang="ts" setup>
defineProps({
  event: { type: Object as PropType<GameEvent>, required: true },
});
const userStore = usePlayerStore();
</script>

<template>
  <div
    v-if="event.id"
    class="flex justify-between items-center gap-4 p-4 bg-dark-overlay border border-solid border-dark-border rounded-md text-dark-text mb-6 hover:bg-green-bg"
  >
    <div class="w-1/4 font-PxGroteskMono">
      {{ shortHash(event.id) }}
    </div>
    <div class="w-1/5 font-PxGroteskMono">
      <TableEllipsis :text="userStore.username(event.user_hash)" />
    </div>
    <div class="w-1/5 font-PxGrotesk">
      {{ formattedTime(event.time) }}
    </div>
    <div class="w-1/5 font-PxGrotesk">
      {{ event.damage }}
    </div>
  </div>
</template>
