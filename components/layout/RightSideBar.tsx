"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Settings, Bell, MessageCircle } from "lucide-react";
import { followersApi } from "@/services/api";
import { User } from "@/types/user";
import FriendCard from "@/components/other/FriendCard";
import CelebrationSection from "@/components/profile/CelebrationSection";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatar } from "@/lib/auth";

const RightSidebar = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await followersApi.getFriends({ page: 1, limit: 5 });
        if (response?.data) {
          setFriends(
            response.data.map((follower: any) => ({
              id: follower.id,
              name: follower.name ?? follower.username,
              username: follower.username,
              avatar: follower.avatar,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <aside className="space-y-6 bg-white w-full h-full rounded-2xl border-l border-gray-100">

      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 border-b p-4">
        {user && (
          <Link href="/profile">
            <img
              src={getUserAvatar(user)}
              alt="Profile"
              className="w-10 h-10 rounded-md object-cover hover:scale-105 transition-transform"
            />
          </Link>
        )}
        <div className="flex items-center gap-3">
          <Link href="/messages">
            <MessageCircle className="w-10 h-10 border rounded-full p-2 text-gray-700 hover:text-primary cursor-pointer" />
          </Link>
          <Link href="/notifications">
            <Bell className="w-10 h-10 border rounded-full p-2 text-gray-700 hover:text-primary cursor-pointer" />
          </Link>
          <Link href="/settings">
            <Settings className="w-10 h-10 border rounded-full p-2 text-gray-700 hover:text-primary cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Friend Suggestions */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-800">Friend Suggestions</h3>
          <Link href="/friends" className="text-sm text-primary font-medium hover:underline">
            See All
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : friends.length === 0 ? (
          <p className="text-sm text-gray-500">No suggestions yet.</p>
        ) : (
          <div className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{friend.name}</p>
                    <p className="text-gray-500 text-xs">@{friend.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => console.log("Add friend", friend.id)}
                  className="text-primary text-xl hover:scale-110"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Celebrations */}
      <section>
        <CelebrationSection />
      </section>
    </aside>
  );
};

export default RightSidebar;
