<script setup lang="ts">
import { avatarRootStyles } from '@kurocado-studio/systemhaus-ui';
import { AvatarRoot } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  size?: 'default' | 'sm' | 'lg';
}>();
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="props.size"
    :class="cn(avatarRootStyles({ size: props.size }), props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
