<script lang="ts" setup>
import { read_address_events_receipts } from '~/lib/utils/fuel';

useHead({
  title: 'Leaderboard',
  titleTemplate: '',
});

const config = useRuntimeConfig();

const events = ref<GameEvent[]>([]);

onMounted(async () => {
  console.log(config);
  events.value = await read_address_events_receipts(config.public.SIGNER_ADDRESS);
  console.log(events.value);

  setInterval(async () => {
    events.value = await read_address_events_receipts(config.public.SIGNER_ADDRESS);
  }, 3000);
});
</script>

<template>
  <n-split direction="horizontal" class="min-h-40 gap-4" :max="0.75" :min="0.25">
    <template #1>
      <n-space class="min-h-40" :size="40" vertical>
        <Player v-if="events.length" :event="events[0]" />
        <TableEvents :events="events" />
      </n-space>
    </template>
    <template #2>
      <div class="min-h-40">
        <n-space size="large" vertical>
          <!-- Players (from chain)
          <h2>TOP Players</h2>
          <TablePlayers /> -->

          <!-- User (from DB) -->
          <h2>TOP Players</h2>
          <TableUsers />
        </n-space>
      </div>
    </template>
  </n-split>
</template>
