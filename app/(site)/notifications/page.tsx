"use client";

import { NotificationsList } from "@/components/notifications/NotificationsList";
import { useMarkAllAsRead, useUnreadNotificationsCount } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { data: unreadCount } = useUnreadNotificationsCount();
  const markAllAsReadMutation = useMarkAllAsRead();

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold">Notifications</h1>
            {unreadCount && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount && unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              variant="outline"
              size="sm"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <NotificationsList />
        </div>
      </div>
    </div>
  );
}