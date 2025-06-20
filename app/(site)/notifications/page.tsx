"use client";

import { useEffect, useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";
import { notificationsApi } from "@/services/api";
import {
  Notification,
} from '@/types/notifications';
import { PaginatedQuery } from '@/types/comon';
import { ApiResponse } from "@/types/apiResponse";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const payload: PaginatedQuery = {
          limit: 10,
          page: 1,
        };

        const res: ApiResponse<Notification[]> = await notificationsApi.getNotifications(payload);

        if (res.data) {
          setNotifications(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-sm text-gray-500">Loading notifications...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <span className="text-sm text-gray-500">({filter})</span>
          </div>
          <button className="text-primary text-sm font-medium">
            Mark all as read
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No notifications found.
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-10 h-10 rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          <span className="font-medium">{notification.user.name}</span>{" "}
                          {notification.action}{" "}
                          <span className="font-medium">{notification.target}</span>
                        </p>
                        <div className="flex items-center space-x-2">
                          {notification.status === "pending" && (
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary">
                                Approve
                              </button>
                              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                                Decline
                              </button>
                            </div>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      {notification.comment && (
                        <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {notification.comment}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
