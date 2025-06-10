import BaseApiService from './base';
import { 
  Notification, 
  PaginationParams, 
  ApiResponse,
  PaginatedResponse 
} from '@/types/api';

class NotificationsApiService extends BaseApiService {
  // Get notifications with pagination and filtering
  async getNotifications(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    return this.request({
      method: 'GET',
      url: '/notifications',
      params,
    });
  }

  // Get a single notification by ID
  async getNotification(id: string): Promise<ApiResponse<Notification>> {
    return this.request({
      method: 'GET',
      url: `/notifications/${id}`,
    });
  }

  // Mark notification as read
  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return this.request({
      method: 'PATCH',
      url: `/notifications/${id}/read`,
    });
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<ApiResponse<void>> {
    return this.request({
      method: 'PATCH',
      url: '/notifications/read-all',
    });
  }
}

export const notificationsApi = new NotificationsApiService();