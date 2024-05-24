<template>
  <PageNav />
  <div class="page-container pb:10 relative flex-grow pt-1 md:pb-32 md:pt-[35px]">
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
window.$i18n = useI18n();
window.$message = useMessage();
</script>
