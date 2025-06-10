import BaseApiService from './base';
import { 
  Post, 
  CreatePostPayload, 
  Comment, 
  ReportPostPayload, 
  PaginationParams, 
  ApiResponse,
  PaginatedResponse 
} from '@/types/api';

class PostsApiService extends BaseApiService {
  // Get posts with pagination and filtering
  async getPosts(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Post>>> {
    return this.request({
      method: 'GET',
      url: '/posts',
      params,
    });
  }

  // Create a new post
  async createPost(payload: CreatePostPayload): Promise<ApiResponse<Post>> {
    const formData = new FormData();
    
    // Add text content
    formData.append('message', payload.message);
    if (payload.reply_to) {
      formData.append('reply_to', payload.reply_to);
    }

    // Add media files
    Object.entries(payload).forEach(([key, value]) => {
      if (key.startsWith('media_') && value) {
        formData.append(key, value as any);
      }
    });

    return this.request({
      method: 'POST',
      url: '/posts',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Get a single post by ID
  async getPost(id: string): Promise<ApiResponse<Post>> {
    return this.request({
      method: 'GET',
      url: `/posts/${id}`,
    });
  }

  // Get comments for a post
  async getPostComments(id: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Comment>>> {
    return this.request({
      method: 'GET',
      url: `/posts/${id}/comments`,
      params,
    });
  }

  // Add or update comments
  async updatePostComments(id: string, comments: Partial<Comment>[]): Promise<ApiResponse<Comment[]>> {
    return this.request({
      method: 'PUT',
      url: `/posts/${id}/comments`,
      data: { comments },
    });
  }

  // Report a post
  async reportPost(id: string, payload: ReportPostPayload): Promise<ApiResponse<void>> {
    return this.request({
      method: 'GET', // Note: The spec shows GET, but this might be a typo
      url: `/posts/${id}/report`,
      data: payload,
    });
  }

  // Toggle like on a post
  async toggleLike(id: string): Promise<ApiResponse<{ is_liked: boolean; likes_count: number }>> {
    return this.request({
      method: 'PUT',
      url: `/posts/${id}/toggle-like`,
    });
  }
}

export const postsApi = new PostsApiService();