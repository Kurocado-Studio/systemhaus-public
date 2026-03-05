import React from 'react';

import type { CommonSizeProps } from '@/types';

import {
  AvatarFallback,
  AvatarImage,
  type AvatarImageProperties,
  AvatarRoot,
  type AvatarRootProperties,
} from './ui/avatar';

export type AvatarProperties = Omit<AvatarRootProperties, 'children'> &
  CommonSizeProps & {
    fallback?: string;
    src?: AvatarImageProperties['src'];
    alt?: AvatarImageProperties['alt'];
  };

export function Avatar({
  size,
  fallback,
  src,
  alt,
  ...rest
}: AvatarProperties): React.ReactNode {
  return (
    <AvatarRoot size={size} {...rest}>
      <AvatarImage size={size} src={src} alt={alt} />
      <AvatarFallback size={size}>{fallback}</AvatarFallback>
    </AvatarRoot>
  );
}
