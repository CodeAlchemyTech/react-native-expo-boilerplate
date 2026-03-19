import { View } from 'react-native';
import { Text } from './Text';
import { cn } from '@utils/cn';

export interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <View className={cn('flex-row items-center gap-3', className)}>
        <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <Text className="text-sm text-gray-400 dark:text-gray-500">{label}</Text>
        <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </View>
    );
  }

  return (
    <View className={cn('h-px bg-gray-200 dark:bg-gray-700 w-full', className)} />
  );
}
