/**
 * Utility for conditional NativeWind class composition.
 * Works like clsx — filters out falsy values and joins classes.
 *
 * Usage:
 *   cn('base-class', isActive && 'active-class', variant === 'primary' && 'bg-primary-600')
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
