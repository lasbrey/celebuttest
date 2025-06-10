# Social Media API Integration

This project includes a comprehensive integration with social media REST API endpoints, featuring posts, notifications, followers, and more.

## 🚀 Features

### API Integration
- **TypeScript-first**: Fully typed API responses and payloads
- **React Query**: Optimized data fetching with caching and background updates
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Built-in loading and error states for all operations

### Endpoints Covered
- **Posts**: Create, read, like, comment, and report posts
- **Notifications**: Real-time notifications with read/unread status
- **Followers**: Follow/unfollow users, view friends and followers
- **Media**: Support for up to 6 media files per post

## 📁 Project Structure

```
├── types/
│   └── api.ts                 # TypeScript interfaces for all API types
├── services/
│   └── api/
│       ├── base.ts           # Base API service with auth and error handling
│       ├── posts.ts          # Posts API service
│       ├── notifications.ts  # Notifications API service
│       └── followers.ts      # Followers API service
├── hooks/
│   ├── usePosts.ts          # React Query hooks for posts
│   ├── useNotifications.ts  # React Query hooks for notifications
│   └── useFollowers.ts      # React Query hooks for followers
└── components/
    ├── posts/
    │   ├── PostCard.tsx     # Individual post component
    │   └── PostsList.tsx    # Posts list with loading states
    └── notifications/
        └── NotificationsList.tsx # Notifications list component
```

## 🔧 Usage Examples

### Fetching Posts
```tsx
import { usePosts } from '@/hooks/usePosts';

function PostsPage() {
  const { data, isLoading, error } = usePosts({
    limit: 10,
    sort: 'created_at:desc'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {data?.data?.data?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Creating a Post
```tsx
import { useCreatePost } from '@/hooks/usePosts';

function CreatePostForm() {
  const createPost = useCreatePost();

  const handleSubmit = (data: CreatePostPayload) => {
    createPost.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Managing Notifications
```tsx
import { useNotifications, useMarkAsRead } from '@/hooks/useNotifications';

function NotificationsPage() {
  const { data: notifications } = useNotifications();
  const markAsRead = useMarkAsRead();

  const handleMarkAsRead = (id: string) => {
    markAsRead.mutate(id);
  };

  return (
    <div>
      {notifications?.data?.data?.map(notification => (
        <div 
          key={notification.id}
          onClick={() => handleMarkAsRead(notification.id)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
```

## 🔐 Authentication

The API services automatically handle authentication by:
- Adding Bearer tokens to requests
- Refreshing tokens when needed
- Redirecting to login on 401 errors
- Storing tokens securely in localStorage

## 📊 React Query Features

- **Caching**: Intelligent caching with configurable stale times
- **Background Updates**: Automatic background refetching
- **Optimistic Updates**: Immediate UI updates for better UX
- **Error Retry**: Automatic retry logic with exponential backoff
- **Infinite Queries**: Support for infinite scrolling
- **Query Invalidation**: Smart cache invalidation on mutations

## 🎨 Components

### PostCard
- Like/unlike functionality with optimistic updates
- Comment and share actions
- Report functionality
- Media display support
- Author information display

### NotificationsList
- Real-time notification updates
- Mark as read functionality
- Different icons for notification types
- Unread indicators

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install @tanstack/react-query axios
```

2. Wrap your app with QueryClientProvider (already done in layout.tsx)

3. Use the hooks in your components:
```tsx
import { usePosts } from '@/hooks/usePosts';
```

## 🔧 Configuration

The base API URL is configured in `services/api/base.ts`:
```typescript
const baseURL = 'https://staging-api.celebut.com/v1'
```

Query client configuration is in `app/layout.tsx` with sensible defaults for:
- Stale time: 1 minute
- Retry logic: 3 attempts (except for auth errors)
- Error handling: Automatic token refresh and logout

## 📱 Mobile Support

All components are responsive and work seamlessly on mobile devices with:
- Touch-friendly interactions
- Responsive layouts
- Optimized loading states
- Mobile-first design approach