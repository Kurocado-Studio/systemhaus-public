import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import type {
  NamedOrDefaultProjectAnnotations,
  NormalizedProjectAnnotations,
  Renderer,
} from 'storybook/internal/types';

export type SetProjectAnnotations = (
  annotations:
    | NamedOrDefaultProjectAnnotations<Renderer>
    | Array<NamedOrDefaultProjectAnnotations<Renderer>>,
) => NormalizedProjectAnnotations<Renderer>;

export const applyVitestSetup = (
  setProjectAnnotations: SetProjectAnnotations,
  projectAnnotations: NamedOrDefaultProjectAnnotations<Renderer>,
) => {
  setProjectAnnotations([
    a11yAddonAnnotations as NamedOrDefaultProjectAnnotations<Renderer>,
    projectAnnotations,
  ]);
};
