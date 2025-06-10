import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/api';

class BaseApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string = 'https://staging-api.celebut.com/v1') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh or redirect to login
          await this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private async handleUnauthorized(): Promise<void> {
    // Clear tokens and redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    }
  }

  protected async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api(config);
      return response.data;
    } catch (error: any) {
      console.error('API request failed:', error);
      
      if (error.response?.data) {
        return error.response.data;
      }
      
      return {
        error: error.message || 'An unexpected error occurred',
        message: 'Request failed',
        status: 'error',
      };
    }
  }
}

export default BaseApiService;