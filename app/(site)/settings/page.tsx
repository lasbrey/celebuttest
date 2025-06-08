"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const settingsItems = [
  { title: "Interests", link: "/settings/interests" },
  { title: "Language", link: "/settings/language" },
  { title: "Content Settings", link: "/settings/content" },
  { title: "Banned Words", link: "/settings/banned-words" },
  { title: "Blocked Users", link: "/settings/blocked-users" },
  { title: "Notifications", link: "/settings/notifications" },
  { title: "Privacy and safety", link: "/settings/privacy" },
  { title: "Change Password", link: "/settings/password" },
  { title: "Request for Verification", link: "/settings/verification" },
  { title: "Linked Devices", link: "/settings/devices" },
  { title: "Celebration & Surprise List", link: "/settings/celebrations" },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <button className="text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>

        <div className="space-y-4">
          {settingsItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50"
            >
              <span className="font-medium">{item.title}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          ))}

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <span className="font-medium">Celebration Post by Others for me</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <span className="font-medium">Surprise Event by Others for me</span>
            <Switch />
          </div>

          <button className="w-full p-4 text-left text-red-600 bg-white rounded-lg hover:bg-gray-50">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}