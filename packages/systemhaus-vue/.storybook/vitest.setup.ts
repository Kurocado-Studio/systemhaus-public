import { setProjectAnnotations } from '@storybook/vue3-vite';

import {
  type SetProjectAnnotations,
  applyVitestSetup,
} from '../../../internal/storybook-config/dist/vitest-setup';
import * as projectAnnotations from './preview';

applyVitestSetup(
  setProjectAnnotations as unknown as SetProjectAnnotations,
  projectAnnotations,
);
