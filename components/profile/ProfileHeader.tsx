import { Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getUserDisplayName, getUserAvatar } from "@/lib/auth";

const ProfileHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="relative -mt-24 mb-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative -mt-24 mb-8 flex justify-between items-end">
      <div className="flex items-end">
        <div className="relative">
          <img
            src={getUserAvatar(user)}
            alt="Profile"
            className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg object-cover"
          />
        </div>
        <div className="ml-6 mb-6">
          <h1 className="text-3xl font-bold">{getUserDisplayName(user)}</h1>
          <p className="text-gray-600">@{user.username}</p>
          {user.email && (
            <p className="text-gray-600">{user.email}</p>
          )}
          {user.account_type === 'business' && user.industry && (
            <p className="text-gray-600 capitalize">{user.industry}</p>
          )}
          <p className="mt-2 text-gray-600 max-w-xl">
            {user.account_type === 'business' 
              ? `Welcome to ${user.business_name || user.username}! We're here to help you celebrate life's special moments.`
              : "Hi there! 👋 I'm here to celebrate life's amazing moments with friends and family."
            }
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="bg-white text-primary px-6 py-2 rounded-lg border hover:bg-gray-50">
          <Share2 className="h-5 w-5" />
        </button>
        <Link href="/profile/edit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary">
         Edit Profile
        </Link>
        <button className="bg-white text-gray-600 px-3 py-2 rounded-lg border hover:bg-gray-50">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;