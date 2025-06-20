import { BaseApiClient } from "@/services/api/base";
import { ApiResponse } from "@/types/apiResponse";
import { Post, PostComment } from "@/types/posts";
import { PaginatedQuery } from "@/types/comon";

export class PostsApiClient extends BaseApiClient {
  async getPosts(payload: PaginatedQuery): Promise<ApiResponse<Post[]>> {
    return this.request("/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  createPost(data: Record<string, any>): Promise<ApiResponse<Post>> {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getPost(id: string): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${id}`, { method: "GET" });
  }

  getPostComments(id: string): Promise<ApiResponse<PostComment[]>> {
    return this.request(`/posts/${id}/comments`, { method: "GET" });
  }

  toggleLike(id: string): Promise<ApiResponse<null>> {
    return this.request(`/posts/${id}/toggle-like`, { method: "POST" });
  }

  reportPost(id: string, reason: string): Promise<ApiResponse<null>> {
    return this.request(`/posts/${id}/report`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  }
}
