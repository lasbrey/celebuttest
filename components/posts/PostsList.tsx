import React from 'react';
import { PostCard } from './PostCard';
import { usePosts, useReportPost } from '@/hooks/usePosts';
import { PaginationParams } from '@/types/api';
import { Loader2 } from 'lucide-react';

interface PostsListProps {
  params?: PaginationParams;
}

export function PostsList({ params }: PostsListProps) {
  const { data: postsResponse, isLoading, error } = usePosts(params);
  const reportPostMutation = useReportPost();

  const handleReport = (postId: string) => {
    reportPostMutation.mutate({
      postId,
      payload: { reason: 'inappropriate_content' }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load posts. Please try again.</p>
      </div>
    );
  }

  const posts = postsResponse?.data?.data || [];

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onReport={() => handleReport(post.id)}
        />
      ))}
    </div>
  );
}