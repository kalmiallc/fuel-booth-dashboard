<script lang="ts" setup>
defineProps({
  size: { type: Number, default: 36 },
  width: { type: Number, default: 2 },
  color: { type: String, default: 'currentColor' },
});
</script>

<template>
  <div class="rt-ContainerInner">
    <h2
      class="text-heading data-[size=&quot;1&quot;]:text-h1 data-[size=&quot;2&quot;]:text-h2 data-[size=&quot;3&quot;]:text-h3 data-[size=&quot;4&quot;]:text-h4 data-[size=&quot;5&quot;]:text-h5 data-[size=&quot;6&quot;]:text-h6 border-border fuel-Heading m-0 flex flex-wrap items-center justify-between gap-2 border-b pb-2 font-medium tracking-tight first:mb-8 tablet:flex-nowrap tablet:gap-4 tablet:pb-4"
      data-size="2"
    >
      <span
        data-accent-color="gray"
        class="rt-Badge fuel-Badge rt-r-size-2 rt-variant-soft h-full flex-shrink-0 px-2 tablet:mt-1.5 tablet:self-start"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="fuel-Icon inline-flex items-center text-current"
        >
          <path d="M13 5h8"></path>
          <path d="M13 9h5"></path>
          <path d="M13 15h8"></path>
          <path d="M13 19h5"></path>
          <path
            d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          ></path>
          <path
            d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          ></path>
        </svg>
      </span>
      <div
        class="rt-Flex laptop:text-[2.2rem] fuel-HStack rt-r-display-flex rt-r-jc-start rt-r-gap-4 order-3 flex-shrink-0 basis-full items-center justify-between gap-3 text-[1.7rem] tablet:order-none tablet:flex-1 tablet:flex-col tablet:items-start tablet:justify-start tablet:gap-0 tablet:text-[2rem]"
      >
        Recent Transactions
      </div>
      <div class="flex h-full items-center tablet:self-center"></div>
    </h2>

    <div class="desktop:py-0 py-4 tablet:py-8">
      <div class="rt-Grid fuel-Grid flex flex-col gap-6"></div>
      <div class="rt-Flex fuel-Flex rt-r-display-flex rt-r-jc-start mobile:justify-end">
        <div
          class="rt-Flex fuel-HStack rt-r-display-flex rt-r-jc-start rt-r-gap-1 mt-6 flex grid w-full grid-cols-[auto_1fr_auto] mobile:justify-end tablet:w-auto"
        >
          <button
            data-disabled="true"
            data-accent-color="gray"
            disabled=""
            class="rt-reset rt-BaseButton rt-Button fuel-Button fuel-Button rt-r-size-2 rt-variant-soft"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="tabler-icon tabler-icon-arrow-left"
            >
              <path d="M5 12l14 0"></path>
              <path d="M5 12l6 6"></path>
              <path d="M5 12l6 -6"></path>
            </svg></button
          ><button
            data-accent-color="gray"
            aria-readonly="true"
            class="rt-reset rt-BaseButton rt-Button bg-gray-3 fuel-Button bg-gray-3 fuel-Button rt-r-size-2 rt-variant-soft"
          >
            Page
            <!-- -->1</button
          ><button
            data-accent-color="gray"
            class="rt-reset rt-BaseButton rt-Button fuel-Button fuel-Button rt-r-size-2 rt-variant-soft cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="tabler-icon tabler-icon-arrow-right"
            >
              <path d="M5 12l14 0"></path>
              <path d="M13 18l6 -6"></path>
              <path d="M13 6l6 6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!--/$-->
  </div>
</template>

<style lang="postcss" module></style>
