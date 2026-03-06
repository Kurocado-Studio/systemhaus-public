import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';

import { basePreviewParameters } from '../previewBase';

type Preview = ProjectAnnotations<Renderer>;

export const createVuePreview = (
  overrides: Partial<Preview> = {},
): Preview => ({
  parameters: basePreviewParameters,
  ...overrides,
});

const preview: Preview = createVuePreview();

export default preview;
