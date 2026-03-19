import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { Text } from './Text';
import { cn } from '@utils/cn';

export interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Input({
  label,
  errorMessage,
  helperText,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(errorMessage);

  return (
    <View className={cn('gap-1', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}
      <View
        className={cn(
          'flex-row items-center rounded-input border bg-white dark:bg-slate-800 px-3 py-3 gap-2',
          isFocused
            ? 'border-primary-500'
            : hasError
              ? 'border-danger'
              : 'border-gray-200 dark:border-gray-700'
        )}
      >
        {leftIcon && <View>{leftIcon}</View>}
        <TextInput
          className={cn(
            'flex-1 text-base text-gray-900 dark:text-gray-50 p-0',
            className
          )}
          placeholderTextColor="#9ca3af"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View>{rightIcon}</View>}
      </View>
      {(errorMessage || helperText) && (
        <Text
          className={cn(
            'text-xs',
            hasError ? 'text-danger' : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {errorMessage ?? helperText}
        </Text>
      )}
    </View>
  );
}
