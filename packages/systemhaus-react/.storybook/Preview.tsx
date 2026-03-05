import { createReactPreview } from '@internal/storybook-config/react/preview';
import { get } from 'lodash-es';
import { type FC, useLayoutEffect } from 'react';

import {
  ThemeProvider,
  defaultSystemHausThemeVariables,
  useDarkMode,
} from '../src/exports';
import './tailwind.css';

export const decorators = [
  (Story: FC, context: Record<string, unknown>) => {
    const selectedTheme = get(
      context,
      ['userGlobals', 'backgrounds', 'value'],
      'light',
    );

    const { setTheme, theme } = useDarkMode();

    useLayoutEffect(() => {
      if (theme === selectedTheme) return;
      setTheme(selectedTheme);
    }, [selectedTheme, setTheme, theme]);

    return (
      <ThemeProvider theme={defaultSystemHausThemeVariables}>
        <Story />
      </ThemeProvider>
    );
  },
];

const preview = createReactPreview({
  decorators,
});

export default preview;
