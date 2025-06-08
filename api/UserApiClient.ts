import { ApiResponse } from '@/types/auth';
import { BaseApiClient } from '@/api/baseApiClient';

export class UserApiClient extends BaseApiClient {
  async getSelf(): Promise<ApiResponse> {
    return this.request("/auth/self", {
      method: "GET",
    });
  }

}
