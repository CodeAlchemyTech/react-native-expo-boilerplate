import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms/Text';
import { Button } from '@components/atoms/Button';
import { cn } from '@utils/cn';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title, message, onRetry, className }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <View className={cn('flex-1 items-center justify-center gap-3 p-8', className)}>
      <Text className="text-xl font-semibold text-gray-900 dark:text-gray-50 text-center">
        {title ?? 'Oops!'}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {message ?? t('common.error.generic')}
      </Text>
      {onRetry && (
        <Button
          label={t('common.button.retry')}
          onPress={onRetry}
          variant="outline"
          className="mt-2"
        />
      )}
    </View>
  );
}
