import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@components/organisms/ScreenContainer';
import { Header } from '@components/organisms/Header';
import { Loader } from '@components/atoms/Loader';
import { ErrorState } from '@components/molecules/ErrorState';
import { ProfileHeader } from '@features/profile/components/ProfileHeader';
import { useProfile } from '@features/profile/hooks/useProfile';
import { useAuthStore } from '@store/auth.store';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const localUser = useAuthStore((s) => s.user);
  const { data: serverUser, isLoading, isError, refetch } = useProfile();

  // Use server data if available, fall back to local store data
  const user = serverUser ?? localUser;

  return (
    <ScreenContainer scrollable>
      <Header title={t('profile.title')} />
      {isLoading && <Loader fullScreen />}
      {isError && !user && <ErrorState onRetry={refetch} />}
      {user && <ProfileHeader user={user} />}
    </ScreenContainer>
  );
}
