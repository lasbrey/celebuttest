import { BaseApiClient } from '@/services/api/base';
import { ApiResponse } from '@/types/apiResponse';
import { BlockedUser } from '@/types/auth';
import { PaginatedQuery } from "@/types/comon";

export class BlockApiClient extends BaseApiClient {
  async getBlockedUsers(payload: PaginatedQuery): Promise<ApiResponse<BlockedUser[]>> {
    return this.request("/block", {
      method: "GET", 
      body: JSON.stringify(payload),
    });
  }

  async getBlockedUserById(id: string): Promise<ApiResponse<BlockedUser>> {
    return this.request(`/block/${id}`, {
      method: "GET",
    });
  }
}
