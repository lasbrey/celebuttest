import { BaseApiClient } from '@/api/baseApiClient';
import { ApiResponse } from '@/types/apiResponse';

export class UserApiClient extends BaseApiClient {
  async getSelf(): Promise<ApiResponse> {
    return this.request("/auth/self", {
      method: "GET",
    });
  }

}
