<script lang="ts" setup>
import { lightTheme, darkTheme, enUS, dateEnUS } from 'naive-ui';
import { themeOverrides } from '~/lib/config/naive';

const $i18n = useI18n();
window.$i18n = $i18n;

const lang = computed(() => {
  return $i18n.locale.value;
});
const locale = computed(() => {
  switch ($i18n.locale.value) {
    case 'en':
      return enUS;
    default:
      return enUS;
  }
});
const dateLocale = computed(() => {
  switch ($i18n.locale.value) {
    case 'en':
      return dateEnUS;
    default:
      return dateEnUS;
  }
});

const prefersDarkTheme = false;
const themeName = prefersDarkTheme ? 'dark' : 'light';

const theme = computed(() => {
  return prefersDarkTheme ? darkTheme : lightTheme;
});

useHead({
  htmlAttrs: {
    class: themeName,
    lang,
  },
});
</script>

<template>
  <div class="h-full">
    <n-config-provider
      :theme="theme"
      :theme-overrides="themeOverrides"
      :locale="locale"
      :date-locale="dateLocale"
      data-scroll
      class="relative flex h-full flex-col overflow-x-hidden"
    >
      <n-message-provider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-message-provider>
      <n-global-style />
    </n-config-provider>
  </div>
</template>
