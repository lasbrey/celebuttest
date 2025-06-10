import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '@/services/api/notifications';
import { PaginationParams } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...notificationKeys.lists(), params] as const,
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id: string) => [...notificationKeys.details(), id] as const,
};

// Get notifications
export function useNotifications(params?: PaginationParams) {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationsApi.getNotifications(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get single notification
export function useNotification(id: string) {
  return useQuery({
    queryKey: notificationKeys.detail(id),
    queryFn: () => notificationsApi.getNotification(id),
    enabled: !!id,
  });
}

// Mark notification as read
export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: (data, id) => {
      // Update the specific notification in cache
      queryClient.setQueryData(notificationKeys.detail(id), (oldData: any) => {
        if (oldData?.data) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              is_read: true,
            },
          };
        }
        return oldData;
      });

      // Invalidate notifications list
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read.',
        variant: 'destructive',
      });
    },
  });
}

// Mark all notifications as read
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      // Invalidate all notification queries
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      
      toast({
        title: 'Success',
        description: 'All notifications marked as read.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to mark all notifications as read.',
        variant: 'destructive',
      });
    },
  });
}

// Get unread notifications count
export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: [...notificationKeys.all, 'unread-count'],
    queryFn: async () => {
      const response = await notificationsApi.getNotifications({ 
        filter: 'is_read:false',
        limit: 1 
      });
      return response.data?.total || 0;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}