import { usePremiumStore } from '@store/premium.store';

/**
 * Convenience hook for premium/entitlement state.
 * For purchase/restore actions, use useRevenueCat() instead.
 */
export function usePremium() {
  const isPremium = usePremiumStore((s) => s.isPremium);
  const entitlements = usePremiumStore((s) => s.entitlements);
  const isLoading = usePremiumStore((s) => s.isLoading);

  const hasEntitlement = (identifier: string): boolean =>
    entitlements[identifier]?.isActive ?? false;

  return { isPremium, entitlements, isLoading, hasEntitlement };
}
