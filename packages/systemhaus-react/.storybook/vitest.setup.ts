import {
  type SetProjectAnnotations,
  applyVitestSetup,
} from '@internal/storybook-config/vitest-setup';
import { setProjectAnnotations } from '@storybook/react-vite';

import * as projectAnnotations from './Preview';

applyVitestSetup(
  setProjectAnnotations as unknown as SetProjectAnnotations,
  projectAnnotations,
);
