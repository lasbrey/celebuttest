import { BaseApiClient } from '@/services/api/base';
import { ApiResponse } from '@/types/apiResponse';
import {
  Notification,
} from '@/types/notifications';
import { PaginatedQuery } from '@/types/comon';

export class NotificationsApiClient extends BaseApiClient {
  async getNotifications(payload: PaginatedQuery): Promise<ApiResponse<Notification[]>> {
    return this.request("/notifications", {
      method: "GET", 
      body: JSON.stringify(payload),
    });
  }

  async getNotificationById(id: string): Promise<ApiResponse<Notification>> {
    return this.request(`/notifications/${id}`, {
      method: "GET",
    });
  }

  async markNotificationAsRead(id: string): Promise<ApiResponse> {
    return this.request(`/notifications/${id}/read`, {
      method: "PATCH",
    });
  }
}
