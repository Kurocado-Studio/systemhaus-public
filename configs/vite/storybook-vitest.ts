import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { type TestProjectInlineConfiguration } from 'vitest/config';

export const createStorybookVitestProjects = (
  configDir: string,
): Array<TestProjectInlineConfiguration> => [
  {
    extends: true,
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config.
      // See options at:
      // https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({ configDir }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
];
