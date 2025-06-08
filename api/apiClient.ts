import API_BASE_URL from './config';
import { AuthApiClient } from './AuthApiClient';
import { UserApiClient } from './UserApiClient';
import { SettingsApiClient } from './SettingsApiClient';

export const authApi = new AuthApiClient(API_BASE_URL);
export const userApi = new UserApiClient(API_BASE_URL);
export const settingsApi = new SettingsApiClient(API_BASE_URL);