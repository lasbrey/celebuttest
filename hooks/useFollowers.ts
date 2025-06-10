import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followersApi } from '@/services/api/followers';
import { PaginationParams } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const followerKeys = {
  all: ['followers'] as const,
  lists: () => [...followerKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...followerKeys.lists(), params] as const,
  friends: () => [...followerKeys.all, 'friends'] as const,
  friendsList: (params?: PaginationParams) => [...followerKeys.friends(), params] as const,
  details: () => [...followerKeys.all, 'detail'] as const,
  detail: (id: string) => [...followerKeys.details(), id] as const,
};

// Get followers
export function useFollowers(params?: PaginationParams) {
  return useQuery({
    queryKey: followerKeys.list(params),
    queryFn: () => followersApi.getFollowers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get friends
export function useFriends(params?: PaginationParams) {
  return useQuery({
    queryKey: followerKeys.friendsList(params),
    queryFn: () => followersApi.getFriends(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single follower
export function useFollower(id: string) {
  return useQuery({
    queryKey: followerKeys.detail(id),
    queryFn: () => followersApi.getFollower(id),
    enabled: !!id,
  });
}

// Follow user mutation
export function useFollowUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userId: string) => followersApi.followUser(userId),
    onSuccess: (data, userId) => {
      // Update the specific follower in cache
      queryClient.setQueryData(followerKeys.detail(userId), (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              is_following: data.data?.is_following,
            },
          };
        }
        return oldData;
      });

      // Invalidate followers and friends lists
      queryClient.invalidateQueries({ queryKey: followerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: followerKeys.friends() });

      if (!data.error) {
        toast({
          title: 'Success',
          description: 'Successfully followed user!',
        });
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to follow user. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

// Unfollow user mutation
export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userId: string) => followersApi.unfollowUser(userId),
    onSuccess: (data, userId) => {
      // Update the specific follower in cache
      queryClient.setQueryData(followerKeys.detail(userId), (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              is_following: data.data?.is_following,
            },
          };
        }
        return oldData;
      });

      // Invalidate followers and friends lists
      queryClient.invalidateQueries({ queryKey: followerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: followerKeys.friends() });

      if (!data.error) {
        toast({
          title: 'Success',
          description: 'Successfully unfollowed user!',
        });
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to unfollow user. Please try again.',
        variant: 'destructive',
      });
    },
  });
}