import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@store/auth.store';
import { apiClient } from '@services/api/client';
import { ENDPOINTS } from '@services/api/endpoints';
import type { AuthResponse } from '@types/auth.types';
import type { LoginFormValues } from '../types';
import { validateEmail, validatePassword } from '@utils/validators';

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [errors, setErrors] = useState<LoginErrors>({});

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const res = await apiClient.post<AuthResponse>(ENDPOINTS.auth.login, values);
      return res.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
    onError: () => {
      setErrors({ general: 'Invalid email or password.' });
    },
  });

  const validate = (values: LoginFormValues): boolean => {
    const newErrors: LoginErrors = {};
    if (!values.email) newErrors.email = 'Email is required';
    else if (!validateEmail(values.email)) newErrors.email = 'Enter a valid email';
    if (!values.password) newErrors.password = 'Password is required';
    else if (!validatePassword(values.password))
      newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (values: LoginFormValues) => {
    if (!validate(values)) return;
    setErrors({});
    mutation.mutate(values);
  };

  return {
    submit,
    isLoading: mutation.isPending,
    errors,
  };
}
