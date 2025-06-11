import { BaseApiClient } from "@/services/api/base";
import { ApiResponse } from "@/types/apiResponse";
import {
  Follower,
  Friend,
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

export class FollowersApiClient extends BaseApiClient {
  // Helper to build query string from params
  private buildQueryParams(params?: PaginationParams): string {
    if (!params) return "";
    const query = new URLSearchParams(params as any).toString();
    return query ? `?${query}` : "";
  }

  // Get followers with pagination and filtering
  async getFollowers(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<Follower>>> {
    const query = this.buildQueryParams(params);
    return this.request(`/followers${query}`, {
      method: "GET",
    });
  }

  // Get friends (mutual followers)
  async getFriends(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<Friend>>> {
    const query = this.buildQueryParams(params);
    return this.request(`/followers/friends${query}`, {
      method: "GET",
    });
  }

  // Get a specific follower by ID
  async getFollower(id: string): Promise<ApiResponse<Follower>> {
    return this.request(`/followers/${id}`, {
      method: "GET",
    });
  }

  // Follow a user
  async followUser(
    userId: string
  ): Promise<ApiResponse<{ is_following: boolean }>> {
    return this.request(`/followers/${userId}/follow`, {
      method: "POST",
    });
  }

  // Unfollow a user
  async unfollowUser(
    userId: string
  ): Promise<ApiResponse<{ is_following: boolean }>> {
    return this.request(`/followers/${userId}/follow`, {
      method: "DELETE",
    });
  }
}
