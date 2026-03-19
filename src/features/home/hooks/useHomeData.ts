import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/api/client';
import type { ApiResponse } from '@types/api.types';
import type { HomeItem } from '../types';

async function fetchHomeData(): Promise<HomeItem[]> {
  const res = await apiClient.get<ApiResponse<HomeItem[]>>('/home');
  return res.data.data;
}

export function useHomeData() {
  return useQuery({
    queryKey: ['home', 'items'],
    queryFn: fetchHomeData,
    // Home data is not critical to fetch immediately
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
