<script setup lang="ts">
import { avatarImageStyles } from '@kurocado-studio/systemhaus-ui';
import type { AvatarImageProps } from 'reka-ui';
import { AvatarImage } from 'reka-ui';
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

type AvatarImageComponentProps = AvatarImageProps &
  Omit<ImgHTMLAttributes, 'class'> & {
    class?: HTMLAttributes['class'];
  };

const props = defineProps<AvatarImageComponentProps>();
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="props"
    :class="cn(avatarImageStyles(), props.class)"
  >
    <slot />
  </AvatarImage>
</template>
