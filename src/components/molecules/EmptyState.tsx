import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms/Text';
import { Button } from '@components/atoms/Button';
import { cn } from '@utils/cn';

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  subtitle,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <View className={cn('flex-1 items-center justify-center gap-3 p-8', className)}>
      <Text className="text-xl font-semibold text-gray-900 dark:text-gray-50 text-center">
        {title ?? t('common.empty.title')}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {subtitle ?? t('common.empty.subtitle')}
      </Text>
      {actionLabel && onAction && (
        <Button
          label={actionLabel}
          onPress={onAction}
          variant="outline"
          className="mt-2"
        />
      )}
    </View>
  );
}
