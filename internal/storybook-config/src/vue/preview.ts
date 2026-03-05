import type { Preview } from '@storybook/vue3-vite';

import { basePreviewParameters } from '../previewBase';

export const createVuePreview = (
  overrides: Partial<Preview> = {},
): Preview => ({
  parameters: basePreviewParameters,
  ...overrides,
});

const preview: Preview = createVuePreview();

export default preview;
