import { tv } from 'tailwind-variants';

/**
 * Root
 * - Owns sizing via variants (no data-* required)
 * - Also defines the `group/avatar` namespace so descendants can use group-* selectors if you want.
 */
export const avatarRootStyles = tv({
  base: [
    'group/avatar relative flex shrink-0 select-none overflow-hidden rounded-full',
    'after:absolute after:inset-0 after:rounded-full after:border after:border-border',
    'after:mix-blend-darken dark:after:mix-blend-lighten',
  ].join(' '),
  variants: {
    size: {
      sm: 'size-8',
      default: 'h-[2.25rem] w-[2.25rem]',
      lg: 'h-[2.5rem] w-[2.5rem]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Image
 */
export const avatarImageStyles = tv({
  base: 'h-full w-full rounded-full object-cover',
});

/**
 * Fallback
 * - Keeps your existing baseline
 * - Sizes text via variants (instead of group-data)
 */
export const avatarFallbackStyles = tv({
  base: 'bg-muted size-square w-full text-foreground flex items-center justify-center rounded-full',
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Badge
 * - Badge size + svg behavior via variants
 */
export const avatarBadgeStyles = tv({
  base: [
    'bg-primary text-primary-foreground ring-background',
    'absolute bottom-0 right-0 z-10 inline-flex select-none items-center justify-center rounded-full',
    'bg-blend-color ring-2',
  ].join(' '),
  variants: {
    size: {
      sm: 'size-2 [&>svg]:hidden',
      default: 'size-2.5 [&>svg]:size-2',
      lg: 'size-3 [&>svg]:size-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Group wrapper (your existing one is fine; no size variants needed here)
 */
export const avatarGroupStyles = tv({
  base: '*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2',
});

/**
 * Group count
 * - Uses variants instead of group-has-data selectors
 */
export const avatarGroupCountStyles = tv({
  base: [
    'bg-muted text-muted-foreground ring-background',
    'relative flex shrink-0 items-center justify-center rounded-full ring-2',
    'text-sm',
    '[&>svg]:size-4',
  ].join(' '),
  variants: {
    size: {
      sm: 'size-6 [&>svg]:size-3',
      default: 'size-8 [&>svg]:size-4',
      lg: 'h-[2.5rem] w-[2.5rem] [&>svg]:size-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
