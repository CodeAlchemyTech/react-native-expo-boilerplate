import { View, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Header } from '@components/organisms/Header';
import { Text } from '@components/atoms/Text';
import { Divider } from '@components/atoms/Divider';
import { SettingsRow } from '@features/settings/components/SettingsRow';
import { ThemeToggle } from '@features/settings/components/ThemeToggle';
import { useAuthStore } from '@store/auth.store';
import { usePremiumStore } from '@store/premium.store';
import { analyticsService } from '@services/analytics';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isPremium = usePremiumStore((s) => s.isPremium);

  const handleSignOut = () => {
    Alert.alert(
      t('auth.logout.title'),
      t('auth.logout.confirm'),
      [
        { text: t('common.button.cancel'), style: 'cancel' },
        {
          text: t('settings.account.signOut'),
          style: 'destructive',
          onPress: () => {
            analyticsService.track('user_signed_out');
            clearAuth();
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Header title={t('settings.title')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Appearance */}
        <View className="px-4 pt-6 pb-2">
          <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
            {t('settings.theme.label')}
          </Text>
          <ThemeToggle />
        </View>

        <Divider className="my-4" />

        {/* Premium */}
        <View>
          <View className="px-4 pb-2">
            <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {t('settings.premium.label')}
            </Text>
          </View>
          <SettingsRow
            id="premium-status"
            label={t('settings.premium.label')}
            value={isPremium ? 'Active' : 'Free'}
          />
          <SettingsRow
            id="restore"
            label={t('settings.premium.restore')}
            onPress={() => {
              // useRevenueCat().restore() — wire up in paywall screen
            }}
          />
        </View>

        <Divider className="my-4" />

        {/* Account */}
        <View>
          <View className="px-4 pb-2">
            <Text className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {t('settings.account.label')}
            </Text>
          </View>
          <SettingsRow
            id="sign-out"
            label={t('settings.account.signOut')}
            onPress={handleSignOut}
            isDestructive
          />
        </View>

        <View className="h-8" />
      </ScrollView>
    </ScreenContainer>
  );
}
