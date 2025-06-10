import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { postsApi } from '@/services/api/posts';
import { PaginationParams, CreatePostPayload, ReportPostPayload } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  comments: (id: string) => [...postKeys.detail(id), 'comments'] as const,
};

// Get posts with pagination
export function usePosts(params?: PaginationParams) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postsApi.getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Infinite scroll for posts
export function useInfinitePosts(params?: Omit<PaginationParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: postKeys.list(params),
    queryFn: ({ pageParam = 1 }) => 
      postsApi.getPosts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data && 'hasMore' in lastPage.data && lastPage.data.hasMore) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Get single post
export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  });
}

// Get post comments
export function usePostComments(id: string, params?: PaginationParams) {
  return useQuery({
    queryKey: postKeys.comments(id),
    queryFn: () => postsApi.getPostComments(id, params),
    enabled: !!id,
  });
}

// Create post mutation
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postsApi.createPost(payload),
    onSuccess: (data) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      
      if (!data.error) {
        toast({
          title: 'Success',
          description: 'Post created successfully!',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to create post',
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

// Toggle like mutation
export function useToggleLike() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (postId: string) => postsApi.toggleLike(postId),
    onSuccess: (data, postId) => {
      // Update the specific post in cache
      queryClient.setQueryData(postKeys.detail(postId), (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              is_liked: data.data?.is_liked,
              likes_count: data.data?.likes_count,
            },
          };
        }
        return oldData;
      });

      // Invalidate posts list to update like counts
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update like. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

// Report post mutation
export function useReportPost() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ postId, payload }: { postId: string; payload: ReportPostPayload }) =>
      postsApi.reportPost(postId, payload),
    onSuccess: (data) => {
      if (!data.error) {
        toast({
          title: 'Success',
          description: 'Post reported successfully. Thank you for helping keep our community safe.',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to report post',
          variant: 'destructive',
        });
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to report post. Please try again.',
        variant: 'destructive',
      });
    },
  });
}