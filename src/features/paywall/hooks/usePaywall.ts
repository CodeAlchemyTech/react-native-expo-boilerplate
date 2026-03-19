import { useRevenueCat } from '@hooks/useRevenueCat';

/**
 * Thin wrapper around useRevenueCat for the paywall feature.
 * Keeps paywall components decoupled from RevenueCat internals.
 */
export function usePaywall() {
  return useRevenueCat();
}
