import BaseApiService from './base';
import { 
  Follower, 
  Friend, 
  PaginationParams, 
  ApiResponse,
  PaginatedResponse 
} from '@/types/api';

class FollowersApiService extends BaseApiService {
  // Get followers with pagination and filtering
  async getFollowers(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Follower>>> {
    return this.request({
      method: 'GET',
      url: '/followers',
      params,
    });
  }

  // Get friends (mutual followers)
  async getFriends(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Friend>>> {
    return this.request({
      method: 'GET',
      url: '/followers/friends',
      params,
    });
  }

  // Get a specific follower by ID
  async getFollower(id: string): Promise<ApiResponse<Follower>> {
    return this.request({
      method: 'GET',
      url: `/followers/${id}`,
    });
  }

  // Follow a user
  async followUser(userId: string): Promise<ApiResponse<{ is_following: boolean }>> {
    return this.request({
      method: 'POST',
      url: `/followers/${userId}/follow`,
    });
  }

  // Unfollow a user
  async unfollowUser(userId: string): Promise<ApiResponse<{ is_following: boolean }>> {
    return this.request({
      method: 'DELETE',
      url: `/followers/${userId}/follow`,
    });
  }
}

export const followersApi = new FollowersApiService();