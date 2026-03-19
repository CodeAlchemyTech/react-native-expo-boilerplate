/**
 * Shared React Query configuration constants.
 * The QueryClient is instantiated in src/store/query.store.ts using these values.
 */
export const QUERY_CONFIG = {
  STALE_TIME_SHORT:  1000 * 60 * 2,  // 2 minutes — frequently updated data
  STALE_TIME_MEDIUM: 1000 * 60 * 5,  // 5 minutes — default
  STALE_TIME_LONG:   1000 * 60 * 15, // 15 minutes — rarely changes (e.g., offerings)
  GC_TIME:           1000 * 60 * 10, // 10 minutes — garbage collection
  RETRY_COUNT:       2,
  MUTATION_RETRY:    0,
} as const;
