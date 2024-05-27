<script lang="ts" setup></script>

<template>
  <section class="border-border min-h-[var(--nav-height)] border-b bg-background">
    <div class="page-container flex min-h-[120px] items-center justify-between">
      <nav class="flex w-full items-center justify-between gap-8">
        <div class="flex gap-1 border-t-0 px-4 py-4 tablet:gap-4">
          <NuxtLink to="/" title="ReeFi Hub" class="relative block select-none">
            <img src="/images/logo.svg" width="185" height="62" alt="fuel logo" />
          </NuxtLink>
          <span class="inline-flex items-center gap-1">
            <a
              href="https://docs.fuel.network/"
              class="rt-Text rt-reset rt-Link text-color desktop:data-[active=true]:before:content-[&quot;&quot;] desktop:data-[active=true]:before:absolute desktop:data-[active=true]:before:block desktop:data-[active=true]:before:w-full desktop:data-[active=true]:before:h-1 desktop:data-[active=true]:before:bg-brand desktop:data-[active=true]:before:top-[-24px] fuel-NavMenuItem fuel-Link rt-underline-auto relative flex h-auto items-center gap-2 hover:text-brand data-[active=true]:text-brand"
            >
              Developers
            </a>
            <NuxtIcon name="chain" />
          </span>
          <span class="inline-flex items-center gap-1">
            <a
              href="https://forum.fuel.network"
              class="rt-Text rt-reset rt-Link text-color desktop:data-[active=true]:before:content-[&quot;&quot;] desktop:data-[active=true]:before:absolute desktop:data-[active=true]:before:block desktop:data-[active=true]:before:w-full desktop:data-[active=true]:before:h-1 desktop:data-[active=true]:before:bg-brand desktop:data-[active=true]:before:top-[-24px] fuel-NavMenuItem fuel-Link rt-underline-auto relative flex h-auto items-center gap-2 hover:text-brand data-[active=true]:text-brand"
            >
              Community
            </a>
            <NuxtIcon name="chain" />
          </span>
          <span class="inline-flex items-center gap-1">
            <a
              href="https://fuel.network"
              class="rt-Text rt-reset rt-Link text-color desktop:data-[active=true]:before:content-[&quot;&quot;] desktop:data-[active=true]:before:absolute desktop:data-[active=true]:before:block desktop:data-[active=true]:before:w-full desktop:data-[active=true]:before:h-1 desktop:data-[active=true]:before:bg-brand desktop:data-[active=true]:before:top-[-24px] fuel-NavMenuItem fuel-Link rt-underline-auto relative flex h-auto items-center gap-2 hover:text-brand data-[active=true]:text-brand"
            >
              Labs
            </a>
            <NuxtIcon name="chain" />
          </span>
        </div>
        <div class="flex gap-1 border-t-0 px-4 py-4 tablet:gap-4">
          <a
            data-active="true"
            class="rt-Text rt-reset rt-Link text-color desktop:data-[active=true]:before:content-[&quot;&quot;] desktop:data-[active=true]:before:absolute desktop:data-[active=true]:before:block desktop:data-[active=true]:before:w-full desktop:data-[active=true]:before:h-1 desktop:data-[active=true]:before:bg-brand desktop:data-[active=true]:before:top-[-24px] fuel-NavMenuItem fuel-Link rt-underline-auto relative flex h-auto items-center hover:text-brand data-[active=true]:text-brand"
            href="https://app.fuel.network/"
            >Explorer</a
          ><a
            href="https://app.fuel.network/bridge"
            data-active="false"
            class="rt-Text rt-reset rt-Link text-color desktop:data-[active=true]:before:content-[&quot;&quot;] desktop:data-[active=true]:before:absolute desktop:data-[active=true]:before:block desktop:data-[active=true]:before:w-full desktop:data-[active=true]:before:h-1 desktop:data-[active=true]:before:bg-brand desktop:data-[active=true]:before:top-[-24px] fuel-NavMenuItem fuel-Link rt-underline-auto relative flex h-auto items-center hover:text-brand data-[active=true]:text-brand"
            >Bridge</a
          ><a
            href="https://app.fuel.network/ecosystem"
            data-active="false"
            class="rt-Text rt-reset rt-Link text-color desktop:data-[active=true]:before:content-[&quot;&quot;] desktop:data-[active=true]:before:absolute desktop:data-[active=true]:before:block desktop:data-[active=true]:before:w-full desktop:data-[active=true]:before:h-1 desktop:data-[active=true]:before:bg-brand desktop:data-[active=true]:before:top-[-24px] fuel-NavMenuItem fuel-Link rt-underline-auto relative flex h-auto items-center hover:text-brand data-[active=true]:text-brand"
            >Ecosystem</a
          >
        </div>
      </nav>
    </div>
  </section>
</template>
