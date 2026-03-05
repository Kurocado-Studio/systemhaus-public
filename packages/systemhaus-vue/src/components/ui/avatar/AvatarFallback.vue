<script setup lang="ts">
import { avatarFallbackStyles } from '@kurocado-studio/systemhaus-ui';
import { reactiveOmit } from '@vueuse/core';
import type { AvatarFallbackProps } from 'reka-ui';
import { AvatarFallback } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '../../../lib/utils';

const props = defineProps<
  AvatarFallbackProps & {
    class?: HTMLAttributes['class'];
    size?: 'default' | 'sm' | 'lg';
  }
>();

const delegatedProps = reactiveOmit(props, 'class', 'size');
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="cn(avatarFallbackStyles({ size: props.size }), props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
