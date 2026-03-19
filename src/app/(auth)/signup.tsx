import { View } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Text } from '@components/atoms/Text';
import { SignupForm } from '@features/auth/components/SignupForm';

export default function SignupScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer scrollable>
      <View className="flex-1 justify-center px-6 py-12 gap-8">
        {/* Header */}
        <View className="gap-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {t('auth.signup.title')}
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400">
            {t('auth.signup.subtitle')}
          </Text>
        </View>

        {/* Form */}
        <SignupForm />

        {/* Sign in link */}
        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {t('auth.signup.hasAccount')}
          </Text>
          <Link href="/(auth)/login" asChild>
            <Text className="text-sm text-primary-600 font-medium">
              {t('auth.signup.signInLink')}
            </Text>
          </Link>
        </View>
      </View>
    </ScreenContainer>
  );
}
