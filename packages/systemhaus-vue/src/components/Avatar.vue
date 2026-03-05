<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue';
import type { CSSProperties, ImgHTMLAttributes } from 'vue';

import {
  Avatar as AvatarRoot,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

type MotionProperties = {
  opacity?: number;
  x?: number;
  y?: number;
};

type AvatarProps = {
  size?: 'default' | 'sm' | 'lg';
  src?: string;
  alt?: ImgHTMLAttributes['alt'];
  fallback?: string;
  initial?: MotionProperties;
  animate?: MotionProperties;
  exit?: MotionProperties;
  imageProps?: Omit<ImgHTMLAttributes, 'src' | 'alt' | 'class'> & {
    class?: string;
  };
};

const props = defineProps<AvatarProps>();
const attrs = useAttrs();
const animatedStyle = ref<CSSProperties>({});

function toMotionStyle(motion?: MotionProperties): CSSProperties {
  if (!motion) return {};

  const transforms: string[] = [];

  if (typeof motion.x === 'number') {
    transforms.push(`translateX(${motion.x}px)`);
  }

  if (typeof motion.y === 'number') {
    transforms.push(`translateY(${motion.y}px)`);
  }

  return {
    opacity: motion.opacity,
    transform: transforms.length > 0 ? transforms.join(' ') : undefined,
  };
}

function applyAnimateStyle() {
  animatedStyle.value = {
    ...toMotionStyle(props.animate),
    transition: 'opacity 240ms ease, transform 240ms ease',
  };
}

onMounted(() => {
  if (!props.initial && !props.animate) return;

  animatedStyle.value = toMotionStyle(props.initial);
  requestAnimationFrame(() => {
    applyAnimateStyle();
  });
});

watch(
  () => props.animate,
  () => {
    if (!props.animate) return;
    applyAnimateStyle();
  },
  { deep: true },
);

const delegatedAttrs = computed(() => {
  const { style, ...rest } = attrs;
  return rest;
});

const rootStyle = computed(() => {
  const baseStyle = attrs.style as CSSProperties | CSSProperties[] | undefined;
  return [baseStyle, animatedStyle.value];
});
</script>

<template>
  <AvatarRoot v-bind="delegatedAttrs" :size="props.size" :style="rootStyle">
    <AvatarImage
      v-if="props.src"
      :src="props.src"
      :alt="props.alt"
      v-bind="props.imageProps"
    />
    <AvatarFallback :size="props.size">{{ props.fallback }}</AvatarFallback>
  </AvatarRoot>
</template>
