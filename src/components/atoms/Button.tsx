import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Text } from './Text';
import { cn } from '@utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  /** Optional icon rendered to the left of the label */
  leftIcon?: React.ReactNode;
  className?: string;
  accessibilityHint?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary-600 active:bg-secondary-700',
  ghost:     'bg-transparent',
  danger:    'bg-danger active:bg-red-600',
  outline:   'bg-transparent border border-primary-600',
};

const labelStyles: Record<ButtonVariant, string> = {
  primary:   'text-white',
  secondary: 'text-white',
  ghost:     'text-primary-600',
  danger:    'text-white',
  outline:   'text-primary-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const labelSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  className,
  accessibilityHint,
}: ButtonProps) {
  const disabled = isDisabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      className={cn(
        'items-center justify-center rounded-button flex-row gap-2',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50',
        className
      )}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'ghost' || variant === 'outline' ? '#2563eb' : '#ffffff'}
          size="small"
        />
      ) : (
        leftIcon && <View>{leftIcon}</View>
      )}
      <Text
        className={cn(
          'font-semibold',
          labelStyles[variant],
          labelSizeStyles[size]
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
