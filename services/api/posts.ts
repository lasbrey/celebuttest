import { BaseApiClient } from '@/services/api/base';
import { ApiResponse } from '@/types/apiResponse';
import {
  Post,
  CreatePostPayload,
  Comment,
  ReportPostPayload,
  PaginationParams,
  PaginatedResponse,
} from '@/types/api';

export class PostsApiClient extends BaseApiClient {
  // Helper to build query string
  private buildQueryParams(params?: PaginationParams): string {
    if (!params) return '';
    const query = new URLSearchParams(params as any).toString();
    return query ? `?${query}` : '';
  }

  // Get posts
  async getPosts(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Post>>> {
    const query = this.buildQueryParams(params);
    return this.request(`/posts${query}`, {
      method: 'GET',
    });
  }

  // Create a new post
  async createPost(payload: CreatePostPayload): Promise<ApiResponse<Post>> {
    const formData = new FormData();

    formData.append('message', payload.message);
    if (payload.reply_to) {
      formData.append('reply_to', payload.reply_to);
    }

    Object.entries(payload).forEach(([key, value]) => {
      if (key.startsWith('media_') && value) {
        formData.append(key, value as Blob);
      }
    });

    return this.request('/posts', {
      method: 'POST',
      body: formData,
    });
  }

  // Get single post
  async getPost(id: string): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${id}`, {
      method: 'GET',
    });
  }

  // Get comments for post
  async getPostComments(id: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Comment>>> {
    const query = this.buildQueryParams(params);
    return this.request(`/posts/${id}/comments${query}`, {
      method: 'GET',
    });
  }

  // Update comments
  async updatePostComments(id: string, comments: Partial<Comment>[]): Promise<ApiResponse<Comment[]>> {
    return this.request(`/posts/${id}/comments`, {
      method: 'PUT',
      body: JSON.stringify({ comments }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Report post
  async reportPost(id: string, payload: ReportPostPayload): Promise<ApiResponse<void>> {
    return this.request(`/posts/${id}/report`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Toggle like
  async toggleLike(id: string): Promise<ApiResponse<{ is_liked: boolean; likes_count: number }>> {
    return this.request(`/posts/${id}/toggle-like`, {
      method: 'PUT',
    });
  }
}

