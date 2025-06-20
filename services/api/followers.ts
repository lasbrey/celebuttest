import { BaseApiClient } from "@/services/api/base";
import { ApiResponse } from "@/types/apiResponse";
import { Follower } from "@/types/followers";
import { PaginatedQuery } from "@/types/comon";

export class FollowersApiClient extends BaseApiClient {
  async getFollowers(
    payload: PaginatedQuery
  ): Promise<ApiResponse<Follower[]>> {
    return this.request("/followers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  async getFriends(payload: PaginatedQuery): Promise<ApiResponse<Follower[]>> {
    return this.request("/followers/friends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  async getFollowerById(id: string): Promise<ApiResponse<Follower>> {
    return this.request(`/followers/${id}`, {
      method: "GET",
    });
  }
}
