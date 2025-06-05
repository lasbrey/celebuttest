"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Users,
  Heart,
  Share2,
  Gift,
  MessageCircle,
  Send,
  Crown,
  Star,
  MoreHorizontal,
} from "lucide-react";

const stream = {
  title: "Birthday Party Live!",
  streamer: "Alice Smith",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
  viewers: 1234,
  likes: 856,
  category: "Celebrations",
  description: "Join us for an amazing birthday celebration! 🎉🎂",
};

const comments = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&q=80",
      isPremium: true,
    },
    message: "Happy birthday! 🎉",
    time: "2 min ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&q=80",
      isPremium: false,
    },
    message: "This looks amazing! Wish I could be there",
    time: "5 min ago",
  },
];

export default function StreamPage() {
  const [message, setMessage] = useState("");
  const params = useParams();
  const streamId = params.id;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stream Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80"
                alt="Stream"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-gray-200 px-3 py-1 rounded-full flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>LIVE</span>
                <span>{stream.viewers.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white  rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={stream.avatar}
                    alt={stream.streamer}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-xl font-semibold text-gray-800">{stream.title}</h1>
                    <p className="text-gray-400">{stream.streamer}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                    <Heart className="h-5 w-5" />
                    <span>{stream.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                    <Gift className="h-5 w-5" />
                    <span>Send Gift</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-800">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-800">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700">{stream.description}</p>

              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-800">
                <span className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{stream.viewers} viewers</span>
                </span>
                <span>{stream.category}</span>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white  rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800">Live Chat</h2>
            </div>

            <div className="h-[calc(100vh-400px)] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">
                          {comment.user.name}
                        </span>
                        {comment.user.isPremium && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-300">{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send a message"
                    className="flex-1 bg-gray-200 text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button className="p-2 text-yellow-500 hover:text-yellow-400">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}