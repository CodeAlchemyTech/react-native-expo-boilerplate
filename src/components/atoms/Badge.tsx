import { View } from 'react-native';
import { Text } from './Text';
import { cn } from '@utils/cn';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'neutral';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { container: string; text: string }> = {
  primary:   { container: 'bg-primary-100', text: 'text-primary-700' },
  secondary: { container: 'bg-secondary-100', text: 'text-secondary-700' },
  success:   { container: 'bg-green-100',    text: 'text-green-700' },
  danger:    { container: 'bg-red-100',       text: 'text-red-700' },
  warning:   { container: 'bg-amber-100',     text: 'text-amber-700' },
  neutral:   { container: 'bg-gray-100',      text: 'text-gray-700' },
};

export function Badge({ label, variant = 'primary', className }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <View
      className={cn(
        'rounded-pill px-2.5 py-1 self-start',
        styles.container,
        className
      )}
    >
      <Text className={cn('text-xs font-medium', styles.text)}>{label}</Text>
    </View>
  );
}
