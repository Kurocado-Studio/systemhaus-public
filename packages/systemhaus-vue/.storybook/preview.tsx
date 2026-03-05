// @ts-expect-error while we sync types
import { type JSXElement } from 'storybook/internal/babel';
import { defineComponent } from 'vue';

import { createVuePreview } from '../../../internal/storybook-config/dist/vue/preview';
import { MotionProvider } from '../../systemhaus-motion-vue/src/exports';
import '../src/main.css';

export const decorators = [
  (Story: () => JSXElement) => {
    return defineComponent({
      setup() {
        const StoryComponent = Story();

        return () => (
          <MotionProvider>
            <StoryComponent />
          </MotionProvider>
        );
      },
    });
  },
];

const preview = createVuePreview({
  decorators,
});

export default preview;
