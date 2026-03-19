import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Input } from '@components/atoms/Input';
import { Button } from '@components/atoms/Button';
import { Text } from '@components/atoms/Text';
import { useLogin } from '../hooks/useLogin';

export function LoginForm() {
  const { t } = useTranslation();
  const { submit, isLoading, errors } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="gap-4">
      {errors.general && (
        <View className="bg-red-50 dark:bg-red-900/20 rounded-md px-4 py-3">
          <Text className="text-sm text-danger">{errors.general}</Text>
        </View>
      )}
      <Input
        label={t('common.label.email')}
        value={email}
        onChangeText={setEmail}
        errorMessage={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
      />
      <Input
        label={t('common.label.password')}
        value={password}
        onChangeText={setPassword}
        errorMessage={errors.password}
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => submit({ email, password })}
      />
      <Button
        label={t('auth.login.button')}
        onPress={() => submit({ email, password })}
        isLoading={isLoading}
        className="mt-2"
      />
    </View>
  );
}
