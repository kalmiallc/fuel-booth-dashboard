<script lang="ts" setup>
import type { ModalProps } from 'naive-ui';

/**
 * https://github.com/vuejs/core/issues/8286#issuecomment-1545659320
 * Remove once naive-ui updates (https://github.com/tusen-ai/naive-ui/issues/4810)
 */
interface Props extends ModalProps {
  title?: string;
  innerClass?: string;
  titleClass?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <n-modal
    class="min-w-full max-w-full rounded-3xl border-2 border-solid border-none bg-white xs:min-w-[400px] sm:min-w-[487px]"
  >
    <div class="relative" :class="innerClass || 'px-3 py-6 sm:p-10'">
      <!-- Close Button -->
      <!-- eslint-disable vue/require-explicit-emits -->
      <button
        class="hover:text-tq-hover absolute right-3 top-2 z-10 block !p-0.5 sm:right-5 sm:top-5"
        @click="$emit('update:show', false)"
      >
        <NuxtIcon name="close" class="text-[12px]" />
      </button>

      <!-- Before title -->
      <slot name="top" />

      <!-- Title -->
      <h2
        v-if="props.title"
        class="mb-6 text-center text-xl font-medium text-green sm:mb-10 md:text-3xl"
        :class="titleClass"
      >
        {{ props.title }}
      </h2>

      <!-- Content -->
      <slot />
    </div>
  </n-modal>
</template>
