import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/api/client';
import { ENDPOINTS } from '@services/api/endpoints';
import type { User } from '@types/user.types';
import type { ApiResponse } from '@types/api.types';

async function fetchProfile(): Promise<User> {
  const res = await apiClient.get<ApiResponse<User>>(ENDPOINTS.user.me);
  return res.data.data;
}

export function useProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
  });
}
