<script lang="ts" setup>
defineProps({
  progress: { type: Number, default: 0 }, // percent -> eg. 0.68
  labelRight: { type: [String, Number], default: '' },
  tooltip: { type: String, default: '' },
  mark: {
    type: Object as PropType<{
      at: number;
      tag: string;
      title?: string;
      description?: string;
      link?: string;
      linkTitle?: string;
      disabled?: boolean;
    }>,
    default: () => undefined,
  },
  medium: { type: Boolean, default: false },
  variant: { type: String as PropType<'tiny' | 'small' | 'medium' | 'big'>, default: 'big' },
});

const markRef = ref<HTMLElement | undefined>(undefined);
const markTooltip = reactive({
  hoverTag: false,
  hoverContent: false,
  clicked: false,
});

onClickOutside(markRef, () => {
  markTooltip.hoverTag = false;
  markTooltip.hoverContent = false;
  markTooltip.clicked = false;
});
</script>

<template>
  <n-popover :disabled="!tooltip" trigger="hover" :show-arrow="false">
    <template #trigger>
      <div
        class="relative z-3 flex w-full select-none items-center justify-between rounded-[15px] px-3"
        :class="{
          'border-tq h-[7px] border border-solid': variant === 'tiny',
          'bg-gray-blue/30 h-[8px]': variant === 'small',
          'border-gray-border/20 h-[10px] border border-solid': variant === 'medium',
          'border-gray-border/20 h-[32px] border border-solid bg-white': variant === 'big',
        }"
      >
        <!-- Fill -->
        <div
          class="absolute overflow-hidden rounded-[16px]"
          :class="variant === 'small' ? 'inset-0' : '-inset-px'"
        >
          <div
            class="bg-tq h-full transition-all"
            :class="{ 'rounded-r-[16px]': progress >= 0.2 }"
            :style="{ width: `${progress * 100}%` }"
          ></div>
        </div>

        <!-- % progress text -->
        <span
          v-if="variant === 'big'"
          class="relative z-1 text-sm font-medium"
          :class="{ 'text-white': progress >= 0.2 }"
        >
          {{ `${Math.round(progress * 100)}%` }}
        </span>

        <!-- Right label text -->
        <span
          v-if="labelRight && !['tiny', 'small'].includes(variant)"
          class="relative z-1 font-medium"
          :class="[{ 'text-white': progress >= 0.96 }, variant === 'big' ? 'text-sm' : 'text-xs']"
        >
          {{ labelRight }}
        </span>

        <!-- Mark (line at some % + tooltip) -->
        <div
          v-if="mark && !mark.disabled"
          ref="markRef"
          class="absolute top-0 h-full"
          :style="{ left: `${mark.at * 100}%` }"
        >
          <!-- Line -->
          <span
            class="border-blue-light absolute inset-0 -translate-x-full border-0 border-l border-dashed"
          ></span>

          <!-- Tag -->
          <span
            class="absolute left-1/2 top-full flex -translate-x-1/2 flex-col items-center justify-start"
          >
            <!-- Arrow -->
            <span
              class="border-b-blue-light border-x-[4px] border-b-[6px] border-t border-solid border-transparent"
            ></span>

            <!-- Box -->
            <span
              class="bg-blue-light rounded-[4px] px-1 py-0.5 text-center text-xs leading-none text-white"
            >
              {{ mark.tag }}
            </span>

            <!-- Tooltip content -->
            <Transition name="fade" leave-active-class="!duration-100">
              <div
                v-if="
                  mark.description &&
                  (markTooltip.hoverTag || markTooltip.hoverContent || markTooltip.clicked)
                "
                class="absolute left-1/2 top-full z-50 mt-1 w-[170px] -translate-x-1/2 rounded-lg bg-white px-3 py-2 text-xs shadow-lg"
                @mouseenter="markTooltip.hoverContent = true"
                @mouseleave="markTooltip.hoverContent = false"
              >
                <p v-if="mark.title" class="text-green-light mb-0.5">{{ mark.title }}</p>

                <p class="text-black">{{ mark.description }}</p>

                <p v-if="mark.link">
                  <NuxtLink
                    :to="mark.link"
                    class="font-medium text-green no-underline hover:underline"
                  >
                    {{ mark.linkTitle || mark.link }}
                  </NuxtLink>
                </p>
              </div>
            </Transition>
          </span>

          <!-- Tooltip hitarea -->
          <button
            v-if="mark.description"
            class="absolute left-1/2 top-1/2 h-[calc(100%+48px)] w-[48px] -translate-x-1/2 -translate-y-1/2"
            @mouseenter="markTooltip.hoverTag = true"
            @mouseleave="delay(() => (markTooltip.hoverTag = false), 200)"
            @click="markTooltip.clicked = !markTooltip.clicked"
          ></button>
        </div>
      </div>
    </template>

    <span class="whitespace-nowrap text-sm">{{ tooltip }}</span>
  </n-popover>
</template>
