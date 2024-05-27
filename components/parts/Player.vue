<template>
  <div class="bg-gray text-dark-text p-4">
    <n-flex justify="space-between">
      <h1>GO {{ authStore.user.username }}!</h1>
      <Btn @click="openGame(authStore.user)">Play</Btn>
    </n-flex>
    <n-flex justify="space-between">
      <div>
        <span>TIME</span>
        <h3>{{ authStore.user.time_seconds }}</h3>
      </div>
      <div>
        <span>current speed</span>
        <h3>{{ authStore.user.speed }}</h3>
      </div>
      <div>
        <span>damage</span>
        <h3>{{ authStore.user.damage }}</h3>
      </div>
      <div>
        <span>place</span>
        <h3>{{ place }}</h3>
      </div>
    </n-flex>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const playerStore = usePlayerStore();
const { openGame } = useGame();

const place = computed(() => {
  const place = playerStore.items.findIndex(
    item => item.playerId === authStore.user.player_contract_index_id
  );
  return place ? place + 1 : '?';
});

onMounted(() => {
  setInterval(() => {
    const lastScoreType = authStore.user.score_type;
    authStore.refresh(true);

    if (lastScoreType !== authStore.user.score_type) {
      playerStore.getPlayers();
    }
  }, 10000);
});
</script>
