<template>
  <div>
    <PageHeader />
    <div class="page-container relative flex-grow pb-32 pt-1 md:pt-12">
      <NuxtPage />
    </div>
  </div>
</template>
<script lang="ts" setup>
window.$i18n = useI18n();
window.$message = useMessage();
</script>
