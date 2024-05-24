<script lang="ts" setup>
import { lightTheme, darkTheme, enUS, dateEnUS } from 'naive-ui';
import { themeOverrides } from '~/lib/config/naive';

const prefersDarkTheme = false;
const themeName = prefersDarkTheme ? 'dark' : 'light';

const theme = computed(() => {
  return prefersDarkTheme ? darkTheme : lightTheme;
});

useHead({
  htmlAttrs: {
    class: themeName,
    lang: 'en',
  },
});
</script>

<template>
  <div class="h-full">
    <n-config-provider
      :theme="theme"
      :theme-overrides="themeOverrides"
      :locale="enUS"
      :date-locale="dateEnUS"
      data-scroll
      class="relative flex h-full flex-col overflow-x-hidden"
    >
      <n-message-provider :keep-alive-on-hover="true" :duration="3000" closable>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-message-provider>
      <n-global-style />
    </n-config-provider>
  </div>
</template>
