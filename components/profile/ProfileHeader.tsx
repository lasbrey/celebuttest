"use client";

import { Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getUserDisplayName, getUserAvatar } from "@/lib/auth";

const ProfileHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="relative -mt-24 mb-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const isBusiness = user.account_type === "business";

  return (
    <div className="relative -mt-24 mb-8 bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      {/* Left: Profile Info */}
      <div className="flex items-start md:items-end gap-6">
        <div className="relative">
          <img
            src={getUserAvatar(user)}
            alt="Profile"
            className="w-36 h-36 md:w-38 md:h-38 rounded-2xl border-4 border-white shadow object-cover"
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">{getUserDisplayName(user)}</h1>
          {user.email && <p className="text-gray-500 text-sm">{user.email}</p>}
          {isBusiness && user.industry && (
            <p className="text-gray-500 text-sm capitalize">{user.industry}</p>
          )}

          <p className="mt-3 text-gray-600 text-sm md:text-base max-w-xl">
            {isBusiness
              ? `Welcome to ${user.business_name || user.username}! We're here to help you celebrate life's special moments.`
              : "Hi there! 👋 I'm here to celebrate life's amazing moments with friends and family."}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex gap-2 md:gap-3 mt-2 md:mt-0 self-end md:self-auto">
        {/* <button
          title="Share Profile"
          className="bg-gray-100 text-primary p-2 rounded-lg border hover:bg-gray-200"
        >
          <Share2 className="h-5 w-5" />
        </button> */}

        <Link
          href="/profile/edit"
          className="bg-primary text-white px-4 md:px-6 py-2 rounded-lg hover:bg-primary/90 text-sm font-medium"
        >
          Edit Profile
        </Link>

        {/* <button
          title="More"
          className="bg-gray-100 text-gray-600 p-2 rounded-lg border hover:bg-gray-200"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
