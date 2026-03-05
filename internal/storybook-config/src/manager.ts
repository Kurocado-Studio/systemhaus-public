import { addons } from 'storybook/manager-api';
import { type ThemeVars, themes } from 'storybook/theming';

export type ManagerConfig = Partial<Omit<ThemeVars, 'brandTitle'>> & {
  brandTitle: string;
};

export const createManagerConfig = ({ brandTitle, ...rest }: ManagerConfig) => {
  const channel = addons.getChannel();

  const applyTheme = () => {
    addons.setConfig({ theme: { ...themes.light, ...rest, brandTitle } });
  };

  applyTheme();

  channel.on('GLOBALS_UPDATED', () => {
    applyTheme();
  });
};
