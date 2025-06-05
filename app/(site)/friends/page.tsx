"use client";

import { useState } from "react";
import { Search, Filter, UserPlus, MoreHorizontal, MessageCircle, Heart, Gift } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const friends = [
  {
    id: 1,
    name: "Julia Smith",
    username: "@juliasmith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    mutualFriends: 12,
    status: "Celebrating graduation 🎓",
    lastActive: "2 hours ago",
    isOnline: true,
  },
  {
    id: 2,
    name: "Vermillion D. Gray",
    username: "@vermilliongray",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&q=80",
    mutualFriends: 8,
    status: "Planning a birthday party 🎉",
    lastActive: "3 hours ago",
    isOnline: true,
  },
  {
    id: 3,
    name: "Mai Senpai",
    username: "@maisenpai",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&q=80",
    mutualFriends: 15,
    status: "Just got married! 💍",
    lastActive: "1 day ago",
    isOnline: false,
  },
  {
    id: 4,
    name: "Azunyan U. Wu",
    username: "@azunyandesu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80",
    mutualFriends: 6,
    status: "New job celebration incoming!",
    lastActive: "Just now",
    isOnline: true,
  },
];

const suggestions = [
  {
    id: 1,
    name: "Sarah Connor",
    username: "@sarahconnor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80",
    mutualFriends: 4,
    occupation: "AI Resistance Leader",
  },
  {
    id: 2,
    name: "John Wick",
    username: "@johnwick",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&q=80",
    mutualFriends: 7,
    occupation: "Dog Lover",
  },
  {
    id: 3,
    name: "Ellen Ripley",
    username: "@ellenmripley",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80",
    mutualFriends: 3,
    occupation: "Space Explorer",
  },
];

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Friends</h1>
          <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">
            <UserPlus className="h-5 w-5" />
            <span>Add Friend</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-12">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search friends..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Friends</TabsTrigger>
                  <TabsTrigger value="recent">Recently Active</TabsTrigger>
                  <TabsTrigger value="celebrations">Celebrations</TabsTrigger>
                  <TabsTrigger value="blocked">Blocked</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-12 h-12 rounded-md"
                          />
                          {friend.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-md border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{friend.name}</h3>
                          <p className="text-sm text-gray-500">{friend.username}</p>
                          <p className="text-sm text-gray-600 mt-1">{friend.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MessageCircle className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Gift className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreHorizontal className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}