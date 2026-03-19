import { View } from 'react-native';
import { Text } from '@components/atoms/Text';
import { Badge } from '@components/atoms/Badge';
import { usePremiumStore } from '@store/premium.store';
import type { User } from '@types/user.types';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const isPremium = usePremiumStore((s) => s.isPremium);

  return (
    <View className="items-center gap-3 py-8 px-4">
      {/* Avatar placeholder */}
      <View className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 items-center justify-center">
        <Text className="text-2xl font-bold text-primary-600">
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View className="items-center gap-1">
        <Text className="text-xl font-bold text-gray-900 dark:text-gray-50">
          {user.name}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">{user.email}</Text>
        {isPremium && (
          <Badge label="Premium" variant="primary" className="mt-1" />
        )}
      </View>
    </View>
  );
}
