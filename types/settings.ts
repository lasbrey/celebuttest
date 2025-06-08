export interface LanguagePayload {
    language: string;
}

export interface NotificationPreferencesPayload {
    preferences: Record<string, boolean>;
}

export interface AreaOfInterestsPayload {
    areas_of_interest: string[];
}

export interface BannedWordsPayload {
    words: string[];
}

export interface ChangePasswordPayload {
    old_password: string;
    new_password: string;
}

export interface ContentSettingsPayload {
    settings: Record<string, any>;
}