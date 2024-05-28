<script lang="ts" setup>
import {
  read_address_events,
  read_address_events_receipts,
  read_last_events,
} from '~/lib/utils/fuel';

const authStore = useAuthStore();
const balanceStore = useBalanceStore();
const playerStore = usePlayerStore();
const scoreStore = useScoreStore();
const userStore = useUserStore();

useHead({
  title: 'Leaderboard',
  titleTemplate: '',
});

const transactions = ref<Transaction[]>([]);
const userTransactions = ref<Transaction[]>([]);
const events = ref<GameEvent[]>([]);

onMounted(async () => {
  balanceStore.getBalance();
  playerStore.getPlayers();
  // scoreStore.getScore();
  userStore.getUsers();

  events.value = await read_address_events_receipts();
  transactions.value = await read_last_events();
  userTransactions.value = await read_address_events();

  setInterval(async () => {
    events.value = await read_address_events_receipts();
  }, 3000);
});
</script>

<template>
  <n-split direction="horizontal" class="min-h-40 gap-4" :max="0.75" :min="0.25">
    <template #1>
      <n-space class="min-h-40" :size="40" vertical>
        <Player />
        <TableEvents :events="events" />
        <Transactions :transactions="transactions" />
        <Transactions title="User transactions" :transactions="userTransactions" />
      </n-space>
    </template>
    <template #2>
      <div class="min-h-40">
        <n-space size="large" vertical>
          <!-- Players (from chain) -->
          <h2>TOP Players</h2>
          <TablePlayers />

          <!-- User (from DB) -->
          <h2>Users</h2>
          <TableUsers />
        </n-space>
      </div>
    </template>
  </n-split>
</template>
