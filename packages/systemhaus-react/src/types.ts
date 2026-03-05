import { ThemeEnum } from '@kurocado-studio/systemhaus-ui';

export type CommonSizeProps = {
  size?: 'default' | 'sm' | 'lg';
};

export interface DarkModeController {
  isDark: boolean;
  theme: ThemeEnum;
  toggle: () => void;
  iconSettings: string;
  setTheme: (newTheme: ThemeEnum) => void;
}
