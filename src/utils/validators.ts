const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validatePassword(password: string, minLength = 8): boolean {
  return password.length >= minLength;
}

export function validateNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function validatePhoneNumber(phone: string): boolean {
  // Basic international phone validation
  return /^\+?[\d\s\-()]{7,15}$/.test(phone.trim());
}
