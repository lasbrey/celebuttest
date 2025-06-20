"use client";

import { useEffect, useState } from "react";
import { Search, Filter, UserPlus, MoreHorizontal, MessageCircle, Heart, Gift } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { followersApi } from "@/services/api";
import { User } from "@/types/user";

export default function FriendsPage() {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await followersApi.getFriends({ page: 1, limit: 20 });
        if (response?.data) {
          setFriends(
            response.data.map((follower: any) => ({
              id: follower.id,
              name: follower.name ?? follower.username,
              username: follower.username,
              avatar: follower.avatar,
              status: follower.status ?? "", // Fallback for status if it exists
              isOnline: follower.isOnline ?? false,
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

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Friends</h1>
          <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary">
            <UserPlus className="h-5 w-5" />
            <span>Add Friend</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
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
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Friends</TabsTrigger>
                  <TabsTrigger value="recent">Recently Active</TabsTrigger>
                  <TabsTrigger value="celebrations">Celebrations</TabsTrigger>
                  <TabsTrigger value="blocked">Blocked</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {loading ? (
                    <p className="text-sm text-gray-500">Loading friends...</p>
                  ) : filteredFriends.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">No friends found.</p>
                  ) : (
                    filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={friend.avatar || "/default-avatar.png"}
                              alt={friend.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            {friend.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-md border-2 border-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{friend.name}</h3>
                            <p className="text-sm text-gray-500">@{friend.username}</p>
                            {friend.status && (
                              <p className="text-sm text-gray-600 mt-1">{friend.status}</p>
                            )}
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
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
