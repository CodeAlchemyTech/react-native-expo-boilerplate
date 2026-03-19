import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

/**
 * Returns different values based on the current platform.
 *
 * Usage:
 *   const padding = platformSelect({ ios: 20, android: 16, default: 12 });
 */
export function platformSelect<T>(options: {
  ios?: T;
  android?: T;
  web?: T;
  default: T;
}): T {
  if (isIOS && options.ios !== undefined) return options.ios;
  if (isAndroid && options.android !== undefined) return options.android;
  if (isWeb && options.web !== undefined) return options.web;
  return options.default;
}
