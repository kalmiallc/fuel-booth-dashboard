<script lang="ts" setup>
import { read_address_events_receipts } from '~/lib/utils/fuel';

useHead({
  title: 'Leaderboard',
  titleTemplate: '',
});

window.$i18n = useI18n();
window.$message = useMessage();
const config = useRuntimeConfig();

const events = ref<GameEvent[]>([]);

onMounted(async () => {
  events.value = await read_address_events_receipts(config.public.SIGNER_ADDRESS);
  // events.value = await read_address_events_receipts(
  //   '0xe58df86a96a6d74bf4481657ed4b083d455df4aa05ae86a149f5d2b24db2262a'
  // );

  setInterval(async () => {
    // events.value = await read_address_events_receipts(config.public.SIGNER_ADDRESS);
    events.value.unshift({
      id: `${Math.round(Math.random() * 1000)}`,
      damage: Math.round(Math.random() * 10),
      time: Math.round(Math.random() * 10),
      speed: Math.round(Math.random() * 100),
      distance: 1,
      score_type: 1,
    });
  }, 3000);
});
</script>

<template>
  <div class="bg-green">
    <div class="page-container min-h-[8rem] xl:min-h-[10rem]">
      <Player v-if="events.length" :event="events[0]" />
    </div>
  </div>

  <div class="page-container relative flex-grow pb-14 pt-1 md:pt-12">
    <n-split direction="horizontal" class="min-h-40 gap-4" :max="0.75" :min="0.25">
      <template #1>
        <n-space class="min-h-[44rem]" :size="40" vertical>
          <Transactions :transactions="events" />

          <!-- <h3>Transactions</h3>
          <TableEvents :events="events" /> -->
        </n-space>
      </template>
      <template #2>
        <n-space class="min-h-[44rem]" :size="40" vertical>
          <Scoreboard :last-event="events[0]" />

          <!-- User (from DB) 
            <h3>Scoreboard</h3>
            <TableUsers />-->

          <!-- Players (from chain)
          <h3>TOP Players</h3>
          <TablePlayers />-->
        </n-space>
      </template>
    </n-split>
  </div>
</template>
