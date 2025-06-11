import { BaseApiClient } from '@/services/api/base';
import { ApiResponse } from '@/types/apiResponse';

export class UserApiClient extends BaseApiClient {
  async getSelf(): Promise<ApiResponse> {
    return this.request("/auth/self", {
      method: "GET",
    });
  }

}
