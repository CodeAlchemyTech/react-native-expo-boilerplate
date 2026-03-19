import { TouchableOpacity, View } from 'react-native';
import { Text } from '@components/atoms/Text';
import { cn } from '@utils/cn';
import type { SettingsRowItem } from '../types';

interface SettingsRowProps extends SettingsRowItem {
  className?: string;
}

export function SettingsRow({
  label,
  value,
  onPress,
  rightElement,
  isDestructive = false,
  className,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className={cn(
        'flex-row items-center justify-between py-4 px-4',
        'bg-white dark:bg-slate-800',
        'border-b border-gray-100 dark:border-gray-700',
        className
      )}
      accessibilityRole={onPress ? 'button' : 'none'}
    >
      <Text
        className={cn(
          'text-base',
          isDestructive
            ? 'text-danger'
            : 'text-gray-900 dark:text-gray-50'
        )}
      >
        {label}
      </Text>
      <View className="flex-row items-center gap-2">
        {value && (
          <Text className="text-sm text-gray-500 dark:text-gray-400">{value}</Text>
        )}
        {rightElement}
        {onPress && (
          <Text className="text-gray-400 dark:text-gray-500">›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
