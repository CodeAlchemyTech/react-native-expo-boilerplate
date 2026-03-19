import { TouchableOpacity, View } from 'react-native';
import { Card } from '@components/molecules/Card';
import { Text } from '@components/atoms/Text';
import type { HomeItem } from '../types';

interface FeaturedCardProps {
  item: HomeItem;
  onPress?: (item: HomeItem) => void;
}

export function FeaturedCard({ item, onPress }: FeaturedCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      accessibilityRole="button"
      activeOpacity={0.85}
    >
      <Card className="gap-2">
        <View className="gap-1">
          <Text className="text-base font-semibold text-gray-900 dark:text-gray-50">
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400" numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
