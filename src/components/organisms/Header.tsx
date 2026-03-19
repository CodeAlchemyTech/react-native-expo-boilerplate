import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@components/atoms/Text';
import { cn } from '@utils/cn';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  rightElement,
  className,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View
      className={cn(
        'flex-row items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800',
        className
      )}
    >
      {showBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 p-1"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text className="text-primary-600 text-base">←</Text>
        </TouchableOpacity>
      )}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900 dark:text-gray-50">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</Text>
        )}
      </View>
      {rightElement && <View>{rightElement}</View>}
    </View>
  );
}
