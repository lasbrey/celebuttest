// Pagination and Filtering Types
export interface PaginationParams {
  cursor?: string;
  direction?: string;
  filter?: string;
  limit?: number;
  math?: string;
  page?: number;
  range?: string;
  select?: string[];
  sort?: string;
}

export interface PaginatedResponse<T> extends PaginationParams {
  data: T[];
  total?: number;
  hasMore?: boolean;
}

// Media Types
export interface MediaFile {
  filename: string;
  header: Record<string, string[]>;
  size: number;
}

// Post Types
export interface Post {
  id: string;
  message: string;
  author: {
    id: string;
    username: string;
    full_name?: string;
    avatar?: string;
  };
  media?: MediaFile[];
  reply_to?: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePostPayload {
  message: string;
  reply_to?: string;
  media_1?: MediaFile;
  media_2?: MediaFile;
  media_3?: MediaFile;
  media_4?: MediaFile;
  media_5?: MediaFile;
  media_6?: MediaFile;
}

export interface Comment {
  id: string;
  message: string;
  author: {
    id: string;
    username: string;
    full_name?: string;
    avatar?: string;
  };
  post_id: string;
  created_at: string;
  updated_at: string;
}

export interface ReportPostPayload {
  reason: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'post';
  title: string;
  message: string;
  is_read: boolean;
  data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Follower Types
export interface Follower {
  id: string;
  username: string;
  full_name?: string;
  avatar?: string;
  is_following: boolean;
  is_followed_by: boolean;
  followers_count: number;
  following_count: number;
  created_at: string;
}

export interface Friend extends Follower {
  mutual_friends_count: number;
  last_interaction?: string;
}