import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Text } from '@components/atoms/Text';
import { Input } from '@components/atoms/Input';
import { Button } from '@components/atoms/Button';
import { apiClient } from '@services/api/client';
import { ENDPOINTS } from '@services/api/endpoints';
import { validateEmail } from '@utils/validators';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      apiClient.post(ENDPOINTS.auth.forgotPassword, { email }),
    onSuccess: () => setIsSent(true),
  });

  const handleSubmit = () => {
    if (!email) { setEmailError('Email is required'); return; }
    if (!validateEmail(email)) { setEmailError('Enter a valid email'); return; }
    setEmailError('');
    mutate();
  };

  if (isSent) {
    return (
      <ScreenContainer>
        <View className="flex-1 justify-center items-center px-6 gap-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-50 text-center">
            Check your email
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
            We sent a reset link to {email}
          </Text>
          <Button
            label={t('auth.forgotPassword.backToLogin')}
            onPress={() => router.back()}
            variant="ghost"
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <View className="flex-1 justify-center px-6 py-12 gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {t('auth.forgotPassword.title')}
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400">
            {t('auth.forgotPassword.subtitle')}
          </Text>
        </View>

        <View className="gap-4">
          <Input
            label={t('common.label.email')}
            value={email}
            onChangeText={setEmail}
            errorMessage={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          <Button
            label={t('auth.forgotPassword.button')}
            onPress={handleSubmit}
            isLoading={isPending}
          />
        </View>

        <Button
          label={t('auth.forgotPassword.backToLogin')}
          onPress={() => router.back()}
          variant="ghost"
        />
      </View>
    </ScreenContainer>
  );
}
