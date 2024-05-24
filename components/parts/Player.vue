<template>
  <div class="bg-gray text-dark-text p-4">
    <h1>GO {{ authStore.user.username }}!</h1>
    <n-flex justify="space-between">
      <div>
        <span>TIME</span>
        <h2>{{ authStore.user.time_seconds }}</h2>
      </div>
      <div>
        <span>current speed</span>
        <h2>{{ authStore.user.speed }}</h2>
      </div>
      <div>
        <span>damage</span>
        <h2>{{ authStore.user.damage }}</h2>
      </div>
      <div>
        <span>place</span>
        <h2>{{ authStore.user?.place || '?' }}</h2>
      </div>
    </n-flex>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
</script>
