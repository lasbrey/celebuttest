import { ApiResponse } from '@/types/apiResponse';
import { BaseApiClient } from '@/services/api/base';

export class UserApiClient extends BaseApiClient {
  async getSelf(): Promise<ApiResponse> {
    return this.request("/auth/self", {
      method: "GET",
    });
  }

}
