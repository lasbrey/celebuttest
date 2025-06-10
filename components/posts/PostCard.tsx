import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types/api';
import { useToggleLike } from '@/hooks/usePosts';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onComment?: () => void;
  onShare?: () => void;
  onReport?: () => void;
}

export function PostCard({ post, onComment, onShare, onReport }: PostCardProps) {
  const toggleLikeMutation = useToggleLike();

  const handleLike = () => {
    toggleLikeMutation.mutate(post.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80"}
            alt={post.author.full_name || post.author.username}
            className="w-10 h-10 rounded-xl"
          />
          <div>
            <h3 className="font-semibold">{post.author.full_name || post.author.username}</h3>
            <p className="text-sm text-gray-500">@{post.author.username}</p>
          </div>
        </div>
        <button 
          onClick={onReport}
          className="p-2 hover:bg-gray-100 rounded-xl"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800">{post.message}</p>
      </div>

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-2">
          {post.media.map((media, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <img
                src={media.filename}
                alt="Post media"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            disabled={toggleLikeMutation.isPending}
            className={cn(
              "flex items-center space-x-2 transition-colors",
              post.is_liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            )}
          >
            <Heart className={cn("h-5 w-5", post.is_liked && "fill-current")} />
            <span>{post.likes_count}</span>
          </button>
          
          <button
            onClick={onComment}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments_count}</span>
          </button>
          
          <button
            onClick={onShare}
            className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
        
        <span className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}