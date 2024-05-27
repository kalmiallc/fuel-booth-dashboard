<script lang="ts" setup>
useHead({
  title: 'Fuel game',
  titleTemplate: '',
});

const router = useRouter();
const { openGame } = useGame();

onMounted(() => {});

function onRegistered(user: UserInterface) {
  openGame(user);
  router.push('/dashboard');
}
</script>

<template>
  <div class="mx-auto mt-[5%] max-w-md">
    <div class="text-center">
      <NuxtIcon name="logo-black" class="icon-full inline-block h-24 w-[400px] text-black" filled />
      <p class="mb-10 mt-2">Get behind the wheel and feel the speed of Fuel!</p>
    </div>

    <FormRegister @submit-success="onRegistered" />
  </div>
</template>
