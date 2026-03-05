import type { Preview } from '@storybook/react-vite';

import { basePreviewParameters } from '../previewBase';

export const createReactPreview = (
  overrides: Partial<Preview> = {},
): Preview => ({
  parameters: basePreviewParameters,
  ...overrides,
});

const preview: Preview = createReactPreview();

export default preview;
