import { BaseApiClient } from '@/services/api/base';
import { ApiResponse } from '@/types/apiResponse';
import { 
  Notification, 
  PaginationParams, 
  PaginatedResponse 
} from '@/types/api';

export class NotificationsApiClient extends BaseApiClient {
  // Helper to build query string from params
  private buildQueryParams(params?: PaginationParams): string {
    if (!params) return '';
    const query = new URLSearchParams(params as any).toString();
    return query ? `?${query}` : '';
  }

  // Get notifications with pagination and filtering
  async getNotifications(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    const query = this.buildQueryParams(params);
    return this.request(`/notifications${query}`, {
      method: 'GET',
    });
  }

  // Get a single notification by ID
  async getNotification(id: string): Promise<ApiResponse<Notification>> {
    return this.request(`/notifications/${id}`, {
      method: 'GET',
    });
  }

  // Mark a specific notification as read
  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return this.request(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<ApiResponse<void>> {
    return this.request(`/notifications/read-all`, {
      method: 'PATCH',
    });
  }
}
