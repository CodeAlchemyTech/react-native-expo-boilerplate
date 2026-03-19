import { View } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Text } from '@components/atoms/Text';
import { Divider } from '@components/atoms/Divider';
import { LoginForm } from '@features/auth/components/LoginForm';

export default function LoginScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer scrollable>
      <View className="flex-1 justify-center px-6 py-12 gap-8">
        {/* Header */}
        <View className="gap-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {t('auth.login.title')}
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400">
            {t('auth.login.subtitle')}
          </Text>
        </View>

        {/* Form */}
        <LoginForm />

        {/* Forgot password */}
        <Link href="/(auth)/forgot-password" asChild>
          <Text className="text-sm text-primary-600 text-center">
            {t('auth.login.forgotPassword')}
          </Text>
        </Link>

        <Divider label="or" />

        {/* Sign up link */}
        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {t('auth.login.noAccount')}
          </Text>
          <Link href="/(auth)/signup" asChild>
            <Text className="text-sm text-primary-600 font-medium">
              {t('auth.login.signUpLink')}
            </Text>
          </Link>
        </View>
      </View>
    </ScreenContainer>
  );
}
