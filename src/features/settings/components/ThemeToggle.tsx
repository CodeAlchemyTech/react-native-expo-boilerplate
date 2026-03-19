import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms/Text';
import { useThemeStore } from '@store/theme.store';
import type { ColorScheme } from '@types/theme.types';
import { cn } from '@utils/cn';
import { TouchableOpacity } from 'react-native';

const OPTIONS: Array<{ value: ColorScheme; labelKey: string }> = [
  { value: 'light',  labelKey: 'settings.theme.light' },
  { value: 'dark',   labelKey: 'settings.theme.dark' },
  { value: 'system', labelKey: 'settings.theme.system' },
];

export function ThemeToggle() {
  const { t } = useTranslation();
  const colorScheme = useThemeStore((s) => s.colorScheme);
  const setColorScheme = useThemeStore((s) => s.setColorScheme);

  return (
    <View className="flex-row rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {OPTIONS.map((option) => {
        const isActive = colorScheme === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => setColorScheme(option.value)}
            className={cn(
              'flex-1 py-2 items-center',
              isActive
                ? 'bg-primary-600'
                : 'bg-white dark:bg-slate-800'
            )}
            accessibilityRole="radio"
            accessibilityState={{ checked: isActive }}
          >
            <Text
              className={cn(
                'text-sm font-medium',
                isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              )}
            >
              {t(option.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
