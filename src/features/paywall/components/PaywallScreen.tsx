import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Button } from '@components/atoms/Button';
import { Text } from '@components/atoms/Text';
import { Loader } from '@components/atoms/Loader';
import { FeatureList } from './FeatureList';
import { usePaywall } from '../hooks/usePaywall';

export function PaywallScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { offerings, isLoadingOfferings, purchase, isPurchasing, restore, isRestoring } =
    usePaywall();

  const defaultOffering = offerings?.current;
  const monthlyPackage = defaultOffering?.monthly;

  const handlePurchase = async () => {
    if (!monthlyPackage) return;
    try {
      await purchase(monthlyPackage);
      router.back();
    } catch (error: unknown) {
      // User cancelled — no need to show error
      const isUserCancelled =
        error !== null &&
        typeof error === 'object' &&
        'userCancelled' in error &&
        (error as { userCancelled: boolean }).userCancelled;

      if (!isUserCancelled) {
        Alert.alert('Error', t('paywall.error.purchaseFailed'));
      }
    }
  };

  const handleRestore = async () => {
    try {
      await restore();
      Alert.alert('Success', 'Your purchases have been restored.');
    } catch {
      Alert.alert('Error', t('paywall.error.restoreFailed'));
    }
  };

  if (isLoadingOfferings) {
    return (
      <ScreenContainer>
        <Loader fullScreen />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <View className="flex-1 px-6 py-8 gap-8">
        {/* Header */}
        <View className="items-center gap-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-50 text-center">
            {t('paywall.title')}
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
            {t('paywall.subtitle')}
          </Text>
        </View>

        {/* Feature list */}
        <FeatureList />

        {/* Price */}
        {monthlyPackage && (
          <View className="items-center">
            <Text className="text-4xl font-bold text-gray-900 dark:text-gray-50">
              {monthlyPackage.product.priceString}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">per month</Text>
          </View>
        )}

        {/* Actions */}
        <View className="gap-3">
          <Button
            label={t('paywall.button.subscribe')}
            onPress={handlePurchase}
            isLoading={isPurchasing}
            isDisabled={!monthlyPackage}
            size="lg"
          />
          <Button
            label={t('paywall.button.restore')}
            onPress={handleRestore}
            isLoading={isRestoring}
            variant="ghost"
          />
          <Button
            label={t('paywall.button.close')}
            onPress={() => router.back()}
            variant="ghost"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
