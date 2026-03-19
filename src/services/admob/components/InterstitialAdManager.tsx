import { useCallback, useRef } from 'react';
import { usePremiumStore } from '@store/premium.store';
import { APP_CONFIG } from '@config/app.config';
import { ENV } from '@config/env';
import { isExpoGo } from '@utils/expo';

/**
 * Hook to manage interstitial ads.
 *
 * Usage:
 *   const { showAd } = useInterstitialAd();
 *   // Call showAd() when appropriate (e.g., after completing an action N times)
 */
export function useInterstitialAd(unitId?: string) {
  const isPremium = usePremiumStore((s) => s.isPremium);
  const actionCount = useRef(0);

  const showAd = useCallback(async () => {
    // No-op in Expo Go — native SDK is unavailable
    if (isExpoGo || isPremium || !APP_CONFIG.ENABLE_ADS) return;

    actionCount.current += 1;
    if (actionCount.current < APP_CONFIG.AD_FREQUENCY) return;
    actionCount.current = 0;

    try {
      const { InterstitialAd, AdEventType, TestIds } = await import(
        'react-native-google-mobile-ads'
      );
      const adUnitId = unitId ?? (ENV.IS_DEV ? TestIds.INTERSTITIAL : ENV.ADMOB_INTERSTITIAL_ID);
      const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      await new Promise<void>((resolve, reject) => {
        const loadedListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          loadedListener();
          resolve();
        });
        const errorListener = interstitial.addAdEventListener(
          AdEventType.ERROR,
          (error: unknown) => {
            errorListener();
            reject(error);
          }
        );
        interstitial.load();
      });

      await interstitial.show();
    } catch {
      // Silently fail — ads should never break the app flow
    }
  }, [isPremium, unitId]);

  return { showAd };
}
