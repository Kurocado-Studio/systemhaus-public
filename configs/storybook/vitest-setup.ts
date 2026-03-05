import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import type {
  NamedOrDefaultProjectAnnotations,
  NormalizedProjectAnnotations,
} from 'storybook/internal/types';

export type SetProjectAnnotations = (
  annotations:
    | NamedOrDefaultProjectAnnotations<any>
    | NamedOrDefaultProjectAnnotations<any>[],
) => NormalizedProjectAnnotations<any>;

export const applyVitestSetup = (
  setProjectAnnotations: SetProjectAnnotations,
  projectAnnotations: NamedOrDefaultProjectAnnotations<any>,
) => {
  setProjectAnnotations([
    a11yAddonAnnotations as NamedOrDefaultProjectAnnotations<any>,
    projectAnnotations,
  ]);
};
