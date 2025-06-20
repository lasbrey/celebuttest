"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import FriendCard from "@/components/other/FriendCard";
import { followersApi } from "@/services/api";
import { User } from "@/types/user";

const FriendsSection = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await followersApi.getFriends({ page: 1, limit: 6 });
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
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Friends</h3>
        <Link href="/friends" className="text-primary text-sm">
          See All
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : friends.length === 0 ? (
        <p className="text-sm text-gray-500">You have no friends yet.</p>
      ) : (
        <div className="space-y-4">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              rightAction={
                <button className="text-primary hover:text-primary/80">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsSection;
