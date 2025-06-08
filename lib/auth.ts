import { authApi, userApi } from '@/api/apiClient';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  business_name?: string;
  phone_number?: string;
  date_of_birth?: string;
  industry?: string;
  avatar?: string;
  is_verified?: boolean;
  account_type?: 'user' | 'business';
  [key: string]: any;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Country codes for phone number validation
export const COUNTRY_CODES = [
  { code: '1', country: 'US', flag: '🇺🇸' },
  { code: '44', country: 'UK', flag: '🇬🇧' },
  { code: '234', country: 'NG', flag: '🇳🇬' },
  { code: '91', country: 'IN', flag: '🇮🇳' },
  { code: '86', country: 'CN', flag: '🇨🇳' },
  { code: '81', country: 'JP', flag: '🇯🇵' },
  { code: '49', country: 'DE', flag: '🇩🇪' },
  { code: '33', country: 'FR', flag: '🇫🇷' },
];

// Industry options for business signup
export const getIndustriesFromApi = async (): Promise<string[]> => {
  try {
    const response = await authApi.getIndustries();
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch industries:", error);
    return [];
  }
};

// export const INDUSTRIES = [
//   'entertainment',
//   'technology',
//   'healthcare',
//   'finance',
//   'education',
//   'retail',
//   'hospitality',
//   'manufacturing',
//   'consulting',
//   'other',
// ];

// Utility functions
export const formatPhoneNumber = (
  countryCodeWithPlus: string,
  rawPhone: string
): { isValid: boolean; formattedNumber?: string; error?: string } => {
  const countryCode = countryCodeWithPlus.replace('+', '');
  let cleanNumber = rawPhone.replace(/\D/g, '');

  if (!cleanNumber) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Special case: remove leading zero for Nigerian numbers
  if (countryCode === '234' && cleanNumber.startsWith('0')) {
    cleanNumber = cleanNumber.slice(1);
  }

  const fullNumber = `+${countryCode}${cleanNumber}`;

  // Validate total length
  if (fullNumber.length < 10 || fullNumber.length > 16) {
    return {
      isValid: false,
      error: 'Phone number must be between 10 and 15 digits with country code',
    };
  }

  return {
    isValid: true,
    formattedNumber: fullNumber,
  };
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
  return authApi.isAuthenticated();
};

// Get current user
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const response = await userApi.getSelf();
    return response.data || null;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
};

// Logout user
export const logout = async (): Promise<void> => {
  await authApi.logout();
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

// Get user display name
export const getUserDisplayName = (user: AuthUser): string => {
  if (user.account_type === 'business') {
    return user.business_name || user.username;
  }
  return user.full_name || user.username;
};

// Get user avatar with fallback
export const getUserAvatar = (user: AuthUser): string => {
  return user.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80";
};