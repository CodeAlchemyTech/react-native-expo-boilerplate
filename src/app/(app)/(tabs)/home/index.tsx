import { FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Loader } from '@components/atoms/Loader';
import { EmptyState } from '@components/molecules/EmptyState';
import { ErrorState } from '@components/molecules/ErrorState';
import { Button } from '@components/atoms/Button';
import { HomeHeader } from '@features/home/components/HomeHeader';
import { FeaturedCard } from '@features/home/components/FeaturedCard';
import { useHomeData } from '@features/home/hooks/useHomeData';
import type { HomeItem } from '@features/home/types';
import { ROUTES } from '@constants/routes';

export default function HomeScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useHomeData();

  const handleItemPress = (_item: HomeItem) => {
    router.push(ROUTES.EXAMPLE_MODAL as never);
  };

  return (
    <ScreenContainer>
      <HomeHeader />

      {/* Dev shortcut — remove before shipping */}
      <View className="px-4 pt-2">
        <Button
          label="Component Catalog →"
          onPress={() => router.push('/(app)/components' as never)}
          variant="outline"
          size="sm"
        />
      </View>

      {isLoading && <Loader fullScreen message="Loading..." />}
      {isError && <ErrorState onRetry={refetch} />}
      {!isLoading && !isError && (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
          renderItem={({ item }) => (
            <FeaturedCard item={item} onPress={handleItemPress} />
          )}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      )}
    </ScreenContainer>
  );
}
