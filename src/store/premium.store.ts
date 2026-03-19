import { create } from 'zustand';

export interface Entitlement {
  isActive: boolean;
  productId: string | null;
  expirationDate: string | null;
}

interface PremiumState {
  isPremium: boolean;
  entitlements: Record<string, Entitlement>;
  isLoading: boolean;

  setEntitlements: (entitlements: Record<string, Entitlement>) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

/**
 * Premium / entitlement state.
 *
 * NOT persisted — entitlements are verified from RevenueCat on every app launch.
 * Persisting stale entitlement data would be a security risk.
 */
export const usePremiumStore = create<PremiumState>()((set) => ({
  isPremium: false,
  entitlements: {},
  isLoading: false,

  setEntitlements: (entitlements) =>
    set({
      entitlements,
      isPremium: Object.values(entitlements).some((e) => e.isActive),
    }),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set({ isPremium: false, entitlements: {}, isLoading: false }),
}));
