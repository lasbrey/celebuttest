import API_BASE_URL from "./config";
import { AuthApiClient } from "./Auth";
import { UserApiClient } from "./user";
import { SettingsApiClient } from "./settings";
import { NotificationsApiClient } from "./notifications";
import { PostsApiClient } from "./posts";
import { FollowersApiClient } from "./followers";

export const authApi = new AuthApiClient(API_BASE_URL);
export const userApi = new UserApiClient(API_BASE_URL);
export const settingsApi = new SettingsApiClient(API_BASE_URL);
export const notificationsApi = new NotificationsApiClient(API_BASE_URL);
export const postsApi = new PostsApiClient(API_BASE_URL);
export const followersApi = new FollowersApiClient(API_BASE_URL);
