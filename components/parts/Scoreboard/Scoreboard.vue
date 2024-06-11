<script lang="ts" setup>
const props = defineProps({
  title: { type: String, default: 'Scoreboard' },
  lastEvent: { type: Object as PropType<GameEvent>, default: null },
});

const userStore = useUserStore();

onMounted(() => {
  userStore.getUsers();
});

const activePlayer = computed(() => userStore.items[11]);
const players = computed(() => {
  if (props.lastEvent) {
    let userIndex =
      userStore.items.findIndex(item => item.username_hash === props.lastEvent.id) || 11;
    console.log(userIndex);
    userIndex = 11;

    if (userIndex > 8) {
      return [
        ...userStore.items.slice(0, 3),
        ...userStore.items.slice(userIndex - 3, userIndex + 3),
      ];
    }
  }
  return userStore.items.slice(0, 10);
});
</script>

<template>
  <div>
    <h3 class="mb-4">
      {{ title }}
    </h3>

    <div class="flex justify-between items-center gap-4 p-4 text-base">
      <div class="w-1/12">Position</div>
      <div class="w-5/12">Player</div>
      <div class="w-1/6">Score</div>
      <div class="w-1/6">Time</div>
      <div class="w-1/6">Damage</div>
    </div>

    <n-virtual-list class="max-h-[48rem]" :item-size="90" :items="players">
      <template #default="{ item }">
        <ScoreboardItem
          v-if="item"
          :player="item"
          :class="{ '!bg-green text-black': activePlayer?.username_hash === item.username_hash }"
          :key="item.id"
        />
        <div v-else></div>
      </template>
    </n-virtual-list>
  </div>
</template>

<style lang="postcss" module></style>
