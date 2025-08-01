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
  // fcm_token: string;
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
  email: string;
}

export interface ResetPasswordConfirmPayload {
  password: string;
  email: string;
  token: string;
}

export interface BlockedUser {
  id: string;
  user_id: string;
  blocked_user_id: string;
  blocked_at: string;
  reason?: string;
}