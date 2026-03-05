import {
  avatarBadgeStyles,
  avatarFallbackStyles,
  avatarGroupCountStyles,
  avatarGroupStyles,
  avatarImageStyles,
  avatarRootStyles,
  handleTailwindClasses,
} from '@kurocado-studio/systemhaus-ui';
import { motion } from 'motion/react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import * as React from 'react';

import type { CommonSizeProps } from '@/types.ts';

const MotionAvatarRoot = motion.create(AvatarPrimitive.Root);
const MotionAvatarImage = motion.create(AvatarPrimitive.Image);

export type AvatarImageProperties = React.ComponentProps<
  typeof MotionAvatarImage
> &
  CommonSizeProps;

export type AvatarRootProperties = React.ComponentProps<
  typeof MotionAvatarRoot
> &
  CommonSizeProps;

function AvatarRoot({ className, size, ...props }: AvatarRootProperties) {
  return (
    <MotionAvatarRoot
      data-slot='avatar'
      data-size={size}
      className={handleTailwindClasses(avatarRootStyles({ size }), className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarImageProperties) {
  return (
    <MotionAvatarImage
      data-slot='avatar-image'
      className={handleTailwindClasses(avatarImageStyles(), className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & CommonSizeProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={handleTailwindClasses(
        avatarFallbackStyles({ size }),
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({
  className,
  size,
  ...props
}: React.ComponentProps<'span'> & CommonSizeProps) {
  return (
    <span
      data-slot='avatar-badge'
      className={handleTailwindClasses(avatarBadgeStyles({ size }), className)}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='avatar-group'
      className={handleTailwindClasses(avatarGroupStyles(), className)}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  size,
  ...props
}: React.ComponentProps<'div'> & CommonSizeProps) {
  return (
    <div
      data-slot='avatar-group-count'
      className={handleTailwindClasses(
        avatarGroupCountStyles({ size }),
        className,
      )}
      {...props}
    />
  );
}

export {
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
