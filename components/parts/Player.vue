<template>
  <div class="bg-dark-bg text-dark-text p-4 font-va">
    <n-flex justify="space-between">
      <h1>GO {{ username }}!</h1>
    </n-flex>
    <n-flex justify="space-between">
      <div>
        <span>TIME</span>
        <h3>{{ event.time }}</h3>
      </div>
      <div>
        <span>current speed</span>
        <h3>{{ event.speed }}</h3>
      </div>
      <div>
        <span>damage</span>
        <h3>{{ event.damage }}</h3>
      </div>
      <div>
        <span>place</span>
        <h3>{{ place }}</h3>
      </div>
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
