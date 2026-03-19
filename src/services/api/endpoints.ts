/**
 * All API endpoints in one place.
 * Never hardcode URLs in hooks or services — always reference this file.
 */
export const ENDPOINTS = {
  auth: {
    login:          '/auth/login',
    signup:         '/auth/signup',
    logout:         '/auth/logout',
    refresh:        '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword:  '/auth/reset-password',
  },
  user: {
    me:     '/users/me',
    update: '/users/me',
    delete: '/users/me',
  },
  // Add more domains as needed
} as const;
