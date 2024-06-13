<script lang="ts" setup>
const props = defineProps({
  title: { type: String, default: 'Scoreboard' },
  lastEvent: { type: Object as PropType<GameEvent>, default: null },
});

const userStore = useUserStore();

const oldPlayers = ref<UserInterface[]>([]);
const newRows = ref<number[]>([]);

onMounted(() => {
  userStore.getUsers();
});

const activePlayer = computed(() =>
  userStore.items.find(item => item.username_hash === props?.lastEvent?.user_hash)
);

const players = computed(() => {
  const usersInFinish = userStore.items.filter(item => item.high_score > 0);
  if (props.lastEvent) {
    const userIndex = usersInFinish.findIndex(
      item => item.username_hash === props.lastEvent?.user_hash
    );

    if (userIndex > 7) {
      return [...usersInFinish.slice(0, 3), ...usersInFinish.slice(userIndex - 3, userIndex + 4)];
    }
  }
  return usersInFinish.slice(0, 10);
});

watch(
  () => players.value,
  players => {
    if (oldPlayers.value.length) {
      players.forEach(item => {
        const event = oldPlayers.value.find(e => item.id === e.id);
        if (!event) {
          newRows.value.push(item.id);
        }
      });
    }
    oldPlayers.value = JSON.parse(JSON.stringify(players));
    setTimeout(() => (newRows.value = []), 2000);
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
      <div class="w-1/12">Position</div>
      <div class="w-5/12">Player</div>
      <div class="w-1/6">Score</div>
      <div class="w-1/6">Time</div>
      <div class="w-1/6">Damage</div>
    </div>

    <n-virtual-list class="max-h-[40rem]" :item-size="90" :items="players">
      <template #default="{ item }">
        <ScoreboardItem
          v-if="item"
          :player="item"
          :class="[
            { '!bg-green text-black': activePlayer?.username_hash === item.username_hash },
            { flash: newRows.includes(item.id) },
          ]"
          :key="item.id"
        />
        <div v-else></div>
      </template>
    </n-virtual-list>
  </div>
</template>

<style lang="postcss" module></style>
