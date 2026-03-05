import { type PolymorphicMotionProperties } from '@kurocado-studio/systemhaus-motion-react';
import { ThemeEnum } from '@kurocado-studio/systemhaus-ui';

export interface DarkModeController {
  isDark: boolean;
  theme: ThemeEnum;
  toggle: () => void;
  iconSettings: string;
  setTheme: (newTheme: ThemeEnum) => void;
}

export interface LoaderComponentProperties {
  progress: number;
  isLoading: boolean;
}

export type PolymorphicElementMap = keyof HTMLElementTagNameMap;

export type PolymorphicElement<T extends PolymorphicElementMap = 'div'> =
  PolymorphicMotionProperties<T> & Record<string, unknown>;
