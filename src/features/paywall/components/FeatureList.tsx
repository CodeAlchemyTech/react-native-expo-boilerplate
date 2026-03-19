import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms/Text';
import type { PricingFeature } from '../types';

const FEATURES: PricingFeature[] = [
  {
    id: 'no-ads',
    titleKey: 'paywall.features.noAds',
    descriptionKey: 'paywall.features.noAdsDesc',
  },
  {
    id: 'unlimited',
    titleKey: 'paywall.features.unlimitedAccess',
    descriptionKey: 'paywall.features.unlimitedAccessDesc',
  },
  {
    id: 'support',
    titleKey: 'paywall.features.premiumSupport',
    descriptionKey: 'paywall.features.premiumSupportDesc',
  },
];

export function FeatureList() {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      {FEATURES.map((feature) => (
        <View key={feature.id} className="flex-row gap-3 items-start">
          <View className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 items-center justify-center mt-0.5">
            <Text className="text-primary-600 text-xs font-bold">✓</Text>
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-base font-semibold text-gray-900 dark:text-gray-50">
              {t(feature.titleKey)}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {t(feature.descriptionKey)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
