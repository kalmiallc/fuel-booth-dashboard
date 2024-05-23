<script lang="ts" setup>
import type { ButtonProps } from 'naive-ui';

/**
 * https://github.com/vuejs/core/issues/8286#issuecomment-1545659320
 * Remove once naive-ui updates (https://github.com/tusen-ai/naive-ui/issues/4810)
 */
interface Props extends /* @vue-ignore */ ButtonProps {
  to?: string;
  wrapperClass?: string;
  label?: string;
  fullWidth?: boolean;
  light?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();
const attrs = useAttrs();

const themeOverrides = computed(() =>
  props.light
    ? {
        colorPrimary: '#FFFFFF',
        colorHoverPrimary: '#F6F7FA',
        colorPressedPrimary: '#FCFCFC',
        colorFocusPrimary: '#F6F7FA',
        colorDisabledPrimary: '#FCFCFC',
        textColorPrimary: '#000000',
        textColorHoverPrimary: '#000000',
        textColorPressedPrimary: '#000000',
        textColorFocusPrimary: '#000000',
        textColorDisabledPrimary: '#000000',
        ...(attrs['theme-overrides'] ? attrs['theme-overrides'] : {}),
      }
    : attrs['theme-overrides']
    ? attrs['theme-overrides']
    : {}
);
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    :class="props.wrapperClass"
    class="no-underline"
    tabindex="-1"
  >
    <n-button
      :type="props.type || 'primary'"
      v-bind="$attrs"
      :theme-overrides="themeOverrides"
      :class="[$style.btn, { [$style.fullWidth]: fullWidth }]"
    >
      <span v-if="props.label">{{ props.label }}</span>

      <slot v-else />

      <template #icon>
        <slot name="icon" />
      </template>
    </n-button>
  </NuxtLink>

  <n-button
    v-else
    :type="props.type || 'primary'"
    v-bind="$attrs"
    :theme-overrides="themeOverrides"
    :class="[$style.btn, { [$style.fullWidth]: fullWidth }]"
  >
    <span v-if="props.label">{{ props.label }}</span>

    <slot v-else />

    <template #icon>
      <slot name="icon" />
    </template>
  </n-button>
</template>

<style lang="postcss" module>
.btn {
  &.fullWidth {
    :global(.n-button__content) {
      width: 100%;
    }

    :global(.n-button__icon) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
    }
  }

  :global(.n-base-wave) {
    box-shadow: none !important;
  }
}
</style>
