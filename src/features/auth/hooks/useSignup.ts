import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@store/auth.store';
import { apiClient } from '@services/api/client';
import { ENDPOINTS } from '@services/api/endpoints';
import type { AuthResponse } from '@types/auth.types';
import type { SignupFormValues } from '../types';
import { validateEmail, validatePassword } from '@utils/validators';

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export function useSignup() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [errors, setErrors] = useState<SignupErrors>({});

  const mutation = useMutation({
    mutationFn: async (values: SignupFormValues) => {
      const res = await apiClient.post<AuthResponse>(ENDPOINTS.auth.signup, values);
      return res.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
    onError: () => {
      setErrors({ general: 'Could not create account. Please try again.' });
    },
  });

  const validate = (values: SignupFormValues): boolean => {
    const newErrors: SignupErrors = {};
    if (!values.name) newErrors.name = 'Name is required';
    if (!values.email) newErrors.email = 'Email is required';
    else if (!validateEmail(values.email)) newErrors.email = 'Enter a valid email';
    if (!values.password) newErrors.password = 'Password is required';
    else if (!validatePassword(values.password))
      newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (values: SignupFormValues) => {
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
