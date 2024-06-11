<script lang="ts" setup>
import { formattedTime } from '~~/lib/utils/dates';

const props = defineProps({
  player: { type: Object as PropType<UserInterface>, required: true },
});
const userStore = useUserStore();

const position = computed(() => userStore.items.findIndex(item => item.id === props.player.id) + 1);
</script>

<template>
  <div
    v-if="player.id"
    class="flex justify-between items-center gap-4 p-4 bg-dark-overlay border border-solid border-dark-border rounded-md mb-6 hover:bg-green-bg font-PxGrotesk"
  >
    <div class="w-1/12 font-PxGroteskMono text-center">
      <span v-if="position < 4" class="relative flex justify-center items-center">
        <NuxtIcon v-if="position < 4" name="square" class="text-3xl -mt-1" filled> </NuxtIcon>
        <span
          class="inline-block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black"
        >
          {{ position }}
        </span>
      </span>
      <span v-else>
        {{ position }}
      </span>
    </div>
    <div class="w-5/12 font-PxGroteskMono">
      {{ player.username }}
    </div>
    <div class="w-1/6">
      {{ player.high_score }}
    </div>
    <div class="w-1/6">
      {{ formattedTime(player.time_seconds) }}
    </div>
    <div class="w-1/6">
      {{ player.damage }}
    </div>
  </div>
</template>
