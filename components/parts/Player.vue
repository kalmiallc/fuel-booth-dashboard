<template>
  <div class="px-12 py-6">
    <n-flex justify="space-between">
      <h1>GO {{ username }}!</h1>
      <h2 class="text-h1">{{ place }}</h2>
    </n-flex>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  event: { type: Object as PropType<GameEvent>, required: true },
});
const playerStore = usePlayerStore();

const place = computed(() => {
  const place = playerStore.items.findIndex(item => item.username_hash === props.event.id);
  return place ? place + 1 : '?';
});

const username = computed(() => {
  const player = playerStore.items.find(item => item.username_hash === props.event.id);
  return player?.username ? player.username : shortHash(props.event.id);
});

watch(
  () => props.event.id,
  id => {
    const player = playerStore.items.find(item => item.username_hash === id);
    if (player === undefined) {
      playerStore.getPlayers();
    }
  }
);
</script>
