import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@components/atoms/Text';
import { useAuthStore } from '@store/auth.store';

export function HomeHeader() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  return (
    <View className="px-4 pt-4 pb-2 gap-1">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        {t('home.greeting', { name: user?.name ?? 'there' })}
      </Text>
    </View>
  );
}
