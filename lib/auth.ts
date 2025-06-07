import { apiClient } from './api';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  business_name?: string;
  [key: string]: any;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Country codes for phone number validation
export const COUNTRY_CODES = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+234', country: 'NG', flag: '🇳🇬' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
];

// Industry options for business signup
export const INDUSTRIES = [
  'entertainment',
  'technology',
  'healthcare',
  'finance',
  'education',
  'retail',
  'hospitality',
  'manufacturing',
  'consulting',
  'other',
];

// Utility functions
export const formatPhoneNumber = (countryCode: string, phoneNumber: string): string => {
  // Remove any existing country code from phone number
  const cleanNumber = phoneNumber.replace(/^\+?\d{1,4}/, '').replace(/\D/g, '');
  return `${countryCode}${cleanNumber}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  strength: number;
  errors: string[];
} => {
  const errors: string[] = [];
  let strength = 0;

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    strength++;
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    strength++;
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    strength++;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    strength++;
  }

  return {
    isValid: errors.length === 0,
    strength,
    errors,
  };
};

export const validateUsername = (username: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (username.length > 30) {
    errors.push('Username must be less than 30 characters');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  if (/^[0-9]/.test(username)) {
    errors.push('Username cannot start with a number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Generate FCM token (placeholder - implement based on your FCM setup)
export const generateFCMToken = (): string => {
  // In a real app, this would generate an actual FCM token
  // For now, return a placeholder
  return 'fcm_token_placeholder';
};

// Format date for API (YYYY-MM-DD)
export const formatDateForAPI = (date: string): string => {
  return new Date(date).toISOString().split('T')[0];
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return apiClient.isAuthenticated();
};

// Get current user
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const response = await apiClient.getSelf();
    return response.data || null;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};

// Logout user
export const logout = async (): Promise<void> => {
  await apiClient.logout();
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};