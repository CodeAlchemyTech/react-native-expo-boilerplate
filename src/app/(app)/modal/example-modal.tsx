import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Button } from '@components/atoms/Button';
import { Text } from '@components/atoms/Text';

export default function ExampleModalScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center gap-4 p-6">
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Example Modal
        </Text>
        <Text className="text-base text-muted text-center">
          This is a modal screen. Modals are defined as routes under{' '}
          <Text className="font-mono text-primary-600">(app)/modal/</Text>.
        </Text>
        <Button
          label={t('common.button.done')}
          onPress={() => router.back()}
          className="w-full mt-4"
        />
      </View>
    </ScreenContainer>
  );
}
