import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center bg-surface p-6">
        <Link href="/(app)/(tabs)/home" className="text-primary-600 text-base mt-4">
          {t('common.button.back')}
        </Link>
      </View>
    </>
  );
}
