"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/hooks/useAuth';

const friends = [
  { id: 1, name: "Ada Lovelace" },
  { id: 2, name: "Grace Hopper" },
  { id: 3, name: "Alan Turing" },
];

const settingsItems = [
  { title: "Interests", link: "/settings/interests" },
  { title: "Language", link: "/settings/language" },
  { title: "Notifications", link: "/settings/notifications" },
  { title: "Privacy and safety", link: "/settings/privacy" },
  { title: "Change Password", link: "/settings/password" },
  { title: "Request for Verification", link: "/settings/verification" },
  { title: "Who Gets to Celebrate Me?", link: "celebration-access" },
  { title: "Surprises From Friends", link: "surprise-access" },
];

export default function SettingsPage() {
  const [celebrationDialogOpen, setCelebrationDialogOpen] = useState(false);
  const [surpriseDialogOpen, setSurpriseDialogOpen] = useState(false);
  const [friendSelectorOpen, setFriendSelectorOpen] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [accessType, setAccessType] = useState<"celebration" | "surprise" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFriend = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  const handleItemClick = (link: string) => {
    if (link === "celebration-access") {
      setAccessType("celebration");
      setCelebrationDialogOpen(true);
    } else if (link === "surprise-access") {
      setAccessType("surprise");
      setSurpriseDialogOpen(true);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>

        <div className="space-y-4">
          {settingsItems.map((item, index) => {
            if (item.link === "celebration-access" || item.link === "surprise-access") {
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.link)}
                  className="flex w-full items-center justify-between p-5 text-lg bg-white rounded-xl hover:bg-gray-50"
                >
                  <span className="font-medium">{item.title}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              );
            }

            return (
              <Link
                key={index}
                href={item.link}
                className="flex items-center justify-between p-5 text-lg bg-white rounded-xl hover:bg-gray-50"
              >
                <span className="font-medium">{item.title}</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            );
          })}

          <button onClick={handleLogout} className="w-full p-5 text-left text-red-600 text-lg bg-white rounded-xl hover:bg-gray-50">
            Log out
          </button>
        </div>
      </div>

      {/* Step 1 Dialog: Access Selection */}
      <Dialog open={celebrationDialogOpen || surpriseDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setCelebrationDialogOpen(false);
          setSurpriseDialogOpen(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {accessType === "celebration" ? "Pick Celebration Access" : "Pick Surprise Access"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mb-4">
            {accessType === "celebration"
              ? "Control who gets access to celebrate you openly."
              : "Control who gets access to celebrate you secretly."}
          </p>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between py-6 text-lg"
              onClick={() => {
                setCelebrationDialogOpen(false);
                setSurpriseDialogOpen(false);
                setFriendSelectorOpen(true);
              }}
            >
              {accessType === "celebration"
                ? "Allow Celebration from Friends"
                : "Allow Surprises from Friends"}
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              className="w-full text-left text-red-500 py-6 text-lg justify-between"
              onClick={() => {
                setCelebrationDialogOpen(false);
                setSurpriseDialogOpen(false);
              }}
            >
              Don’t Allow {accessType === "celebration" ? "Celebrations" : "Surprises"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2 Dialog: Friend Picker */}
      <Dialog open={friendSelectorOpen} onOpenChange={setFriendSelectorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {accessType === "celebration"
                ? "Select Your Celebration Squad"
                : "Handpick your secret celebration squad!"}
            </DialogTitle>
          </DialogHeader>

          <div className="mb-4 relative">
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base py-3"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="space-y-3 max-h-[300px] overflow-auto">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between border rounded-lg px-6 py-4 text-lg"
              >
                <span>{friend.name}</span>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => toggleFriend(friend.id)}
                />
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setFriendSelectorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setFriendSelectorOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


// update check mobile figma