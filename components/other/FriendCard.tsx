// components/FriendCard.tsx
"use client";

import React from "react";
import { User } from "@/types/user";

interface FriendCardProps {
  friend: User;
  onUnfriend?: () => void;
  rightAction?: React.ReactNode;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onUnfriend }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <img
          src={friend.avatar || "/default-avatar.png"}
          alt={friend.name}
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <h4 className="font-medium">{friend.name}</h4>
          <p className="text-sm text-gray-500">@{friend.username}</p>
        </div>
      </div>
      <button
        className="text-white bg-red-500 px-4 py-1 rounded-lg text-sm hover:bg-red-600"
        onClick={onUnfriend}
      >
        Unfriend
      </button>
    </div>
  );
};

export default FriendCard;
