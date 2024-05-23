<script lang="ts" setup>
defineProps({});
</script>

<template>
  <a href="/tx/0xd06d165acdaaeab8eed4994f8f44c48a0672d828fd95fcbb6987c53ca4a50f74/simple">
    <article
      class="rt-Box bg-panel-solid text-color border-card-border fuel-Card fuel-Box flex flex-col gap-4 overflow-clip rounded-md border border-solid py-4"
    >
      <div
        class="rt-Box laptop:flex-row laptop:justify-between fuel-CardBody fuel-Box flex flex-col gap-4 px-4 text-base"
      >
        <div class="rt-Box fuel-Box flex h-[26px] gap-3">
          <span data-accent-color="gray" class="rt-Badge fuel-Badge rt-r-size-1 rt-variant-soft">
            Script
          </span>
          <span class="rt-Text text-gray-11 text-md fuel-Text rt-r-size-3 font-medium">
            <span class="font-mono">0xd06d...0f74</span>
          </span>
        </div>
        <div class="rt-Box laptop:flex-nowrap fuel-Box flex flex-wrap items-center gap-3">
          <span
            data-icon="true"
            class="rt-Text laptop:order-none fuel-Text rt-r-size-3 order-3 flex items-center gap-1 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-icon fuel-Icon inline-flex items-center"
            >
              <path d="M14 11h1a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0v-7l-3 -3"></path>
              <path d="M4 20v-14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v14"></path>
              <path d="M3 20l12 0"></path>
              <path d="M18 7v1a1 1 0 0 0 1 1h1"></path>
              <path d="M4 11l10 0"></path>
            </svg>
            0.000005493 ETH
          </span>
          <span data-accent-color="green" class="rt-Badge fuel-Badge rt-r-size-1 rt-variant-soft">
            Success
          </span>
          <span class="rt-Text fuel-Text rt-r-size-3 text-sm">a few seconds ago</span>
        </div>
      </div>
    </article>
  </a>
</template>
