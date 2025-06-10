import React from 'react';
import { useNotifications, useMarkAsRead } from '@/hooks/useNotifications';
import { PaginationParams } from '@/types/api';
import { Loader2, Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationsListProps {
  params?: PaginationParams;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="h-5 w-5 text-red-500" />;
    case 'comment':
      return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case 'follow':
      return <UserPlus className="h-5 w-5 text-green-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

export function NotificationsList({ params }: NotificationsListProps) {
  const { data: notificationsResponse, isLoading, error } = useNotifications(params);
  const markAsReadMutation = useMarkAsRead();

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
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
        <p className="text-red-600">Failed to load notifications. Please try again.</p>
      </div>
    );
  }

  const notifications = notificationsResponse?.data?.data || [];

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No notifications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
          className={cn(
            "p-4 rounded-lg border cursor-pointer transition-colors",
            notification.is_read 
              ? "bg-white border-gray-200" 
              : "bg-blue-50 border-blue-200 hover:bg-blue-100"
          )}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "text-sm",
                notification.is_read ? "font-normal" : "font-semibold"
              )}>
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.created_at).toLocaleDateString()}
              </p>
            </div>
            {!notification.is_read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}