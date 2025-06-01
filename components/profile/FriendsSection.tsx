import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

const friends = [
  {
    name: "Julia Smith",
    username: "@juliasmith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
  },
  {
    name: "Vermillion D. Gray",
    username: "@vermilliongray",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&q=80",
  },
  // More friends here...
];

const FriendsSection = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Friends</h3>
        <Link href="/friends" className="text-primary text-sm">
          See All
        </Link>
      </div>
      <div className="space-y-4">
        {friends.map((friend, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-md"
              />
              <div>
                <h4 className="font-medium">{friend.name}</h4>
                <p className="text-sm text-gray-500">{friend.username}</p>
              </div>
            </div>
            <button className="text-primary">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsSection;
