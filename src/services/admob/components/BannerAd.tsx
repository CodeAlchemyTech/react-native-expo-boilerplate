import { View } from 'react-native';
import { usePremiumStore } from '@store/premium.store';
import { APP_CONFIG } from '@config/app.config';
import { ENV } from '@config/env';
import { isExpoGo } from '@utils/expo';
import { cn } from '@utils/cn';
import type { BannerAdProps } from '../admob.types';

/**
 * Banner ad component.
 *
 * Self-hiding in three cases — callers never need to check:
 *   1. User is premium
 *   2. Ads are disabled via APP_CONFIG
 *   3. Running in Expo Go (native SDK unavailable)
 *
 * In dev/prod builds the real Google Mobile Ads SDK is used.
 * In Expo Go the component renders null, so the rest of the screen is unaffected.
 */
export function BannerAd({ unitId, className }: BannerAdProps) {
  const isPremium = usePremiumStore((s) => s.isPremium);

  if (isPremium || !APP_CONFIG.ENABLE_ADS || isExpoGo) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { BannerAd: Ad, BannerAdSize, TestIds } = require('react-native-google-mobile-ads');
    const adUnitId = unitId ?? (ENV.IS_DEV ? TestIds.BANNER : ENV.ADMOB_BANNER_ID);
    return (
      <View className={cn('items-center w-full', className)}>
        <Ad
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    );
  } catch {
    // Fallback: module unexpectedly unavailable
    return null;
  }
}
