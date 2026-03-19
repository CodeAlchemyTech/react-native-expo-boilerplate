import { useAuthStore } from '@store/auth.store';

/**
 * Convenience hook for auth state.
 * Prefer this over importing useAuthStore directly in components.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setAuth = useAuthStore((s) => s.setAuth);

  return { user, isAuthenticated, clearAuth, setAuth };
}
