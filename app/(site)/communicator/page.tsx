"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MoreVertical, Phone, Video, Star, Pin, MessageCircle } from "lucide-react";

const conversations = [
  {
    id: 1,
    user: {
      name: "Alice Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
      isOnline: true,
      lastSeen: "Just now",
    },
    lastMessage: {
      text: "Hey! Are you coming to the birthday party? 🎉",
      time: "2:30 PM",
      unread: true,
    },
    isPinned: true,
  },
  {
    id: 2,
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80",
      isOnline: false,
      lastSeen: "2 hours ago",
    },
    lastMessage: {
      text: "The graduation ceremony was amazing!",
      time: "1:45 PM",
      unread: false,
    },
    isPinned: false,
  },
  {
    id: 3,
    user: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80",
      isOnline: true,
      lastSeen: "Just now",
    },
    lastMessage: {
      text: "Thanks for the wedding invitation! 💍",
      time: "Yesterday",
      unread: false,
    },
    isPinned: false,
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Conversations List */}
          <div className="col-span-4 bg-white border-r">
            <div className="p-4 border-b">
              <h1 className="text-2xl font-semibold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="divide-y">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/communicator/${conversation.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                          className="w-12 h-12 rounded-xl"
                        />
                        {conversation.user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-xl border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{conversation.user.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {conversation.lastMessage.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessage.time}
                      </span>
                      {conversation.lastMessage.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-xl" />
                      )}
                      {conversation.isPinned && (
                        <Pin className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Empty State / Select Chat */}
          <div className="col-span-8 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-gray-600">
                Select a conversation or start a new one
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}