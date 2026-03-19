import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { purchasesService } from '@services/revenuecat/purchases.service';
import { usePremiumStore } from '@store/premium.store';
import type { PurchasesPackage } from '@services/revenuecat/purchases.types';

/**
 * Primary hook for RevenueCat in UI components.
 *
 * Never import react-native-purchases or purchasesService directly in components.
 * Use this hook for all purchase, restore, and entitlement operations.
 */
export function useRevenueCat() {
  const setEntitlements = usePremiumStore((s) => s.setEntitlements);
  const isPremium = usePremiumStore((s) => s.isPremium);

  const {
    data: offerings,
    isLoading: isLoadingOfferings,
    error: offeringsError,
  } = useQuery({
    queryKey: ['revenuecat', 'offerings'],
    queryFn: () => purchasesService.getOfferings(),
    staleTime: 1000 * 60 * 15, // Cache offerings for 15 minutes
    retry: 1,
  });

  const syncEntitlements = useCallback(
    async () => {
      const info = await purchasesService.getCustomerInfo();
      const active = info.entitlements.active;
      setEntitlements(
        Object.fromEntries(
          Object.entries(active).map(([key, e]) => [
            key,
            {
              isActive: e.isActive,
              productId: e.productIdentifier,
              expirationDate: e.expirationDate,
            },
          ])
        )
      );
    },
    [setEntitlements]
  );

  const { mutateAsync: purchase, isPending: isPurchasing } = useMutation({
    mutationFn: (pkg: PurchasesPackage) => purchasesService.purchasePackage(pkg),
    onSuccess: (result) => {
      const active = result.customerInfo.entitlements.active;
      setEntitlements(
        Object.fromEntries(
          Object.entries(active).map(([key, e]) => [
            key,
            {
              isActive: e.isActive,
              productId: e.productIdentifier,
              expirationDate: e.expirationDate,
            },
          ])
        )
      );
    },
  });

  const { mutateAsync: restore, isPending: isRestoring } = useMutation({
    mutationFn: () => purchasesService.restorePurchases(),
    onSuccess: (info) => {
      const active = info.entitlements.active;
      setEntitlements(
        Object.fromEntries(
          Object.entries(active).map(([key, e]) => [
            key,
            {
              isActive: e.isActive,
              productId: e.productIdentifier,
              expirationDate: e.expirationDate,
            },
          ])
        )
      );
    },
  });

  const checkEntitlement = useCallback(
    (identifier: string): boolean =>
      usePremiumStore.getState().entitlements[identifier]?.isActive ?? false,
    []
  );

  return {
    offerings,
    isLoadingOfferings,
    offeringsError,
    purchase,
    isPurchasing,
    restore,
    isRestoring,
    isPremium,
    checkEntitlement,
    syncEntitlements,
  };
}
