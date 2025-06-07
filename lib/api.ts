const API_BASE_URL = 'https://staging-api.celebut.com/v1';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status?: string;
}

export interface UserSignupPayload {
  country_code: string;
  date_of_birth: string;
  email: string;
  full_name: string;
  password: string;
  phone_number: string;
  username: string;
}

export interface BusinessSignupPayload {
  business_name: string;
  country_code: string;
  email: string;
  industry: string;
  password: string;
  phone_number: string;
  username: string;
}

export interface LoginPayload {
  email: string;
  fcm_token: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

export interface ConfirmEmailPayload {
  email: string;
  token: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export interface ResetPasswordRequestPayload {
  phone_number: string;
}

export interface ResetPasswordConfirmPayload {
  password: string;
  phone_number: string;
  token: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Token management
  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // Auth endpoints
  async signupUser(payload: UserSignupPayload): Promise<ApiResponse> {
    return this.request('/auth/sign-up/user', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async signupBusiness(payload: BusinessSignupPayload): Promise<ApiResponse> {
    return this.request('/auth/sign-up/business', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // Store tokens if login successful
    if (response.data?.accessToken && response.data?.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  async confirmEmail(payload: ConfirmEmailPayload): Promise<ApiResponse> {
    return this.request('/auth/confirm-email', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refreshToken') 
      : null;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.request<LoginResponse>('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    // Update tokens if refresh successful
    if (response.data?.accessToken && response.data?.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  async requestPasswordReset(payload: ResetPasswordRequestPayload): Promise<ApiResponse> {
    return this.request('/auth/resetpassword', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async confirmPasswordReset(payload: ResetPasswordConfirmPayload): Promise<ApiResponse> {
    return this.request('/auth/resetpassword', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  async getSelf(): Promise<ApiResponse> {
    return this.request('/auth/self', {
      method: 'GET',
    });
  }

  async logout(): Promise<void> {
    this.clearTokens();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);