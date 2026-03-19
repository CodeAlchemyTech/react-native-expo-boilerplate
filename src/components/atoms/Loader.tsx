import { ActivityIndicator, View } from 'react-native';
import { Text } from './Text';
import { cn } from '@utils/cn';

export interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loader({
  size = 'large',
  color = '#2563eb',
  message,
  fullScreen = false,
  className,
}: LoaderProps) {
  return (
    <View
      className={cn(
        'items-center justify-center gap-3',
        fullScreen && 'flex-1',
        className
      )}
    >
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="text-sm text-muted dark:text-gray-400">{message}</Text>
      )}
    </View>
  );
}
