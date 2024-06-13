<template>
  <div class="px-12 py-6">
    <n-flex justify="space-between">
      <h1>GO {{ username }}!</h1>
      <h2 class="text-h1">
        <span v-if="props.event.score_type === ScoreType.FINISHED">{{ place }}</span>
      </h2>
    </n-flex>
  </div>
</template>

<script lang="ts" setup>
import { ScoreType } from '~/lib/types/event';

const props = defineProps({
  event: { type: Object as PropType<GameEvent>, required: true },
});
const userStore = useUserStore();

const username = computed(() => userStore.username(props.event.user_hash));

const place = computed(() => {
  const place = userStore.items.findIndex(item => item.username_hash === props.event.user_hash);
  return place ? place + 1 : '';
});

watch(
  () => props.event?.id,
  _ => {
    const player = userStore.items.find(item => item.username_hash === props.event.user_hash);

    if (player === undefined || props.event.score_type > ScoreType.RACING) {
      userStore.getUsers();
    }
  }
);
</script>
