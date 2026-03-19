import type { ColorScheme } from '@types/theme.types';

export interface SettingsRowItem {
  id: string;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isDestructive?: boolean;
}

export { type ColorScheme };
