"use client";

import { useState } from "react";
import { Check, MoreHorizontal, FileText } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "request",
    user: {
      name: "Lex Murphy",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&q=80",
    },
    action: "requested access to",
    target: "UNIX directory tree hierarchy",
    time: "Today at 9:42 AM",
    status: "pending",
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Ray Arnold",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&q=80",
    },
    action: "left 6 comments on",
    target: "Isla Nublar SOC2 compliance report",
    time: "Last Wednesday at 9:42 AM",
  },
  {
    id: 3,
    type: "reply",
    user: {
      name: "Denise Nedry",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&q=80",
    },
    action: "replied to",
    target: "Anna Srzand",
    comment: "Oh, I finished de-bugging the phones, but the system's compiling for eighteen minutes, or twent...",
    time: "Last Wednesday at 9:42 AM",
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

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

        <div className="bg-white rounded-xl shadow-sm divide-y">
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
      </div>
    </div>
  );
}