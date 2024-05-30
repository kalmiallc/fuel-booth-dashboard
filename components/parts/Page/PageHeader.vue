<script lang="ts" setup>
const fuelLinks = [
  { link: 'https://docs.fuel.network/', text: 'Developers' },
  { link: 'https://forum.fuel.network/', text: 'Community' },
  { link: 'https://fuel.network/', text: 'Labs' },
];
const appLinks = [
  { link: 'https://app.fuel.network/', text: 'Explorer' },
  { link: 'https://app.fuel.network/bridge', text: 'Bridge' },
  { link: 'https://app.fuel.network/ecosystem', text: 'Ecosystem' },
];
</script>

<template>
  <section class="border-border border-b bg-background">
    <div class="page-container flex min-h-[100px] items-center justify-between">
      <nav class="flex w-full items-center justify-between gap-8">
        <div class="flex gap-4 mobile:gap-2 border-t-0 px-4 py-4 tablet:gap-3">
          <a href="https://docs.fuel.network/" title="ReeFi Hub" class="relative block select-none">
            <img src="/images/logo.svg" width="185" height="62" alt="fuel logo" />
          </a>
          <span v-for="(link, key) in fuelLinks" :key="key" class="inline-flex items-center gap-1">
            <a :href="link.link" class="text-[17px] no-underline hover:text-brand">
              {{ link.text }}
            </a>
            <NuxtIcon name="chain" class="color-icon" filled />
          </span>
        </div>
        <div class="flex gap-4 mobile:gap-2 border-t-0 px-4 py-4 tablet:gap-3">
          <a
            v-for="(link, key) in appLinks"
            :key="key"
            :href="link.link"
            class="text-[17px] no-underline hover:text-brand"
          >
            {{ link.text }}
          </a>
        </div>
      </nav>
    </div>
  </section>
</template>
