import { QueryClient } from '@tanstack/react-query';

/**
 * Singleton QueryClient with mobile-optimized defaults.
 *
 * Key decisions:
 * - refetchOnWindowFocus: false — "window focus" has no meaning on mobile
 * - networkMode: 'offlineFirst' — don't pause queries when offline (let them fail gracefully)
 * - staleTime: 5min — avoid over-fetching on navigation
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 0,
      networkMode: 'offlineFirst',
    },
  },
});
