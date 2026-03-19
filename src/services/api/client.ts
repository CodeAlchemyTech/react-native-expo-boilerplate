import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { ENV } from '@config/env';
import { useAuthStore } from '@store/auth.store';

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // ── Request interceptor — attach auth token ────────────────────────────────
  client.interceptors.request.use((config) => {
    // Use getState() (not the hook) — this runs outside React render cycle
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // ── Response interceptor — handle 401 globally ────────────────────────────
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Clear local auth state — route guards will redirect to login
        useAuthStore.getState().clearAuth();
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();
