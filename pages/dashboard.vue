<script lang="ts" setup>
import { read_address_events, read_last_events } from '~/lib/utils/fuel';

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

onMounted(async () => {
  balanceStore.getBalance();
  playerStore.getPlayers();
  // scoreStore.getScore();
  userStore.getUsers();

  transactions.value = await read_last_events();
  userTransactions.value = await read_address_events();
});
</script>

<template>
  <n-split direction="horizontal" class="min-h-40 gap-4" :max="0.75" :min="0.25">
    <template #1>
      <div class="min-h-40">
        <Player />
        <Transactions :transactions="transactions" />
        <Transactions title="User transactions" :transactions="userTransactions" />
      </div>
    </template>
    <template #2>
      <div class="min-h-40">
        <TableUsers />
        <TablePlayers />
      </div>
    </template>
  </n-split>
</template>
