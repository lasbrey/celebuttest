import { ApiResponse } from '@/types/apiResponse';
import { UserSignupPayload, BusinessSignupPayload, LoginPayload, LoginResponse, ConfirmEmailPayload, ResetPasswordRequestPayload, ResetPasswordConfirmPayload } from '@/types/auth';
import { BaseApiClient } from '@/services/api/base';

export class AuthApiClient extends BaseApiClient {
  async signupUser(payload: UserSignupPayload): Promise<ApiResponse> {
    return this.request("/auth/sign-up/user", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async signupBusiness(payload: BusinessSignupPayload): Promise<ApiResponse> {
    return this.request("/auth/sign-up/business", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.data?.accessToken && response.data?.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  async getIndustries(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>("/settings/industry-types", {
      method: "GET",
    });
  }
  
  async confirmEmail(payload: ConfirmEmailPayload): Promise<ApiResponse> {
    return this.request("/auth/confirm-email", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async requestPasswordReset(payload: ResetPasswordRequestPayload): Promise<ApiResponse> {
    return this.request("/auth/resetpassword", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async confirmPasswordReset(payload: ResetPasswordConfirmPayload): Promise<ApiResponse> {
    return this.request("/auth/resetpassword", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.request<LoginResponse>("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.data?.accessToken && response.data?.refreshToken) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    this.clearTokens();

    const response = await this.request("/settings/logout", {
      method: "PUT",
    });
    return response;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
