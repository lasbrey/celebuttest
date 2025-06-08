import { ApiResponse } from '@/types/apiResponse';
import { BaseApiClient } from '@/api/baseApiClient';
import {
  LanguagePayload,
  NotificationPreferencesPayload,
  AreaOfInterestsPayload,
  BannedWordsPayload,
  ChangePasswordPayload,
  ContentSettingsPayload,
} from '@/types/settings';

export class SettingsApiClient extends BaseApiClient {
  async addLanguage(payload: LanguagePayload): Promise<ApiResponse> {
    return this.request("/settings/add-language", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async addNotificationPreferences(payload: NotificationPreferencesPayload): Promise<ApiResponse> {
    return this.request("/settings/add-notification-preferences", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async setAreaOfInterests(payload: AreaOfInterestsPayload): Promise<ApiResponse> {
    return this.request("/settings/area-of-interests", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async setBannedWords(payload: BannedWordsPayload): Promise<ApiResponse> {
    return this.request("/settings/banned-words", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async changePassword(payload: ChangePasswordPayload): Promise<ApiResponse> {
    return this.request("/settings/change-password", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async updateContentSettings(payload: ContentSettingsPayload): Promise<ApiResponse> {
    return this.request("/settings/content-settings", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async toggleCommentNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-comment-notification", {
      method: "PATCH",
    });
  }

  async toggleDirectMessageNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-direct-message-notification", {
      method: "PATCH",
    });
  }

  async toggleLikesNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-likes-notification", {
      method: "PATCH",
    });
  }

  async toggleLiveNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-live-notification", {
      method: "PATCH",
    });
  }

  async toggleNewFollowerNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-new-follower-notification", {
      method: "PATCH",
    });
  }

  async togglePushNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-push-notification", {
      method: "PATCH",
    });
  }

  async toggleRepostNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-repost-notification", {
      method: "PATCH",
    });
  }

  async toggleTagsAndMentionNotification(): Promise<ApiResponse> {
    return this.request("/settings/toggle-tags-and-mention-notification", {
      method: "PATCH",
    });
  }
}
