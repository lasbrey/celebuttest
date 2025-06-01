"use client";

import { Search, MoreHorizontal } from "lucide-react";
import { ArrowLeft } from "lucide-react";

interface Friend {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface FriendSelectionProps {
  onBack: () => void;
  onContinue: () => void;
  selectedFriend: Friend | null;
  setSelectedFriend: (friend: Friend) => void;
}

const friends: Friend[] = [
  {
    name: "Nick Jonas",
    role: "Editor",
    email: "nickjonas@gmail.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80",
  },
  {
    name: "Emma Stone",
    role: "Writer",
    email: "emmastone@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a746be?w=100&h=100&q=80",
  },
  {
    name: "John Doe",
    role: "Designer",
    email: "johndoe@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&q=80",
  },
  {
    name: "Olivia Brown",
    role: "Developer",
    email: "oliviabrown@gmail.com",
    avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100&h=100&q=80",
  },
  {
    name: "Liam Smith",
    role: "Manager",
    email: "liamsmith@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80",
  },
];

const FriendSelection: React.FC<FriendSelectionProps> = ({ onBack, onContinue, selectedFriend, setSelectedFriend }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm max-w-4xl mx-auto">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-2">Create Celebration Post</h1>
      <p className="text-gray-600 mb-6">Select a friend for the celebration</p>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Friends List */}
      <div className="space-y-2">
        {friends.map((friend, index) => (
          <div
            key={index}
            onClick={() => setSelectedFriend(friend)}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 
              ${selectedFriend?.email === friend.email ? "bg-primary text-white border border-primary" : "hover:bg-gray-50"}`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="h-10 w-10 rounded-md bg-amber-300"
              />
              <div>
                <h3 className="font-medium">{friend.name} - {friend.role}</h3>
                <p className="text-sm text-gray-500">{friend.email}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">Back</button>
        <button
          onClick={onContinue}
          disabled={!selectedFriend}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};



export default FriendSelection;