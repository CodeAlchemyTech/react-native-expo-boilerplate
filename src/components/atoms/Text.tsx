import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

/**
 * Base Text component.
 *
 * NativeWind v4 requires that Text accept className — this wrapper ensures
 * it works correctly with the jsxImportSource transform.
 * Always use this component instead of React Native's Text directly.
 */
export interface TextProps extends RNTextProps {
  className?: string;
}

export function Text({ className, ...props }: TextProps) {
  return <RNText className={className} {...props} />;
}
