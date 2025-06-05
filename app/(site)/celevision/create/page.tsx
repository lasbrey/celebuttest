"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Video,
  Mic,
  Settings,
  Users,
  Share2,
  MessageCircle,
  Gift,
  ArrowLeft,
  Image as ImageIcon,
  Wand2,
  Sparkles,
  Layout,
  Layers,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const categories = [
  { value: "celebrations", label: "Celebrations" },
  { value: "weddings", label: "Weddings" },
  { value: "birthdays", label: "Birthdays" },
  { value: "graduations", label: "Graduations" },
  { value: "anniversaries", label: "Anniversaries" },
  { value: "babyshowers", label: "Baby Showers" },
];

const layouts = [
  {
    id: "single",
    name: "Single View",
    description: "Full screen camera view",
    icon: Layout,
  },
  {
    id: "split",
    name: "Split View",
    description: "Camera and screen share",
    icon: Layers,
  },
];

export default function CreateStreamPage() {
  const [isLive, setIsLive] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("single");
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/celevision"
              className="p-2 text-gray-400 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-semibold text-black">Create Celevision</h1>
          </div>
          {!isLive ? (
            <button
              onClick={() => setIsLive(true)}
              className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Go Live
            </button>
          ) : (
            <button
              onClick={() => setIsLive(false)}
              className="bg-gray-200 text-black px-6 py-2 rounded-xl hover:bg-white transition-colors"
            >
              End Stream
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Stream Preview */}
          <div className="col-span-2 space-y-6">
            <div className="relative aspect-video bg-white rounded-2xl overflow-hidden shadow-sm">
              {showPreview ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Camera preview will appear here</p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-gray-300/90 backdrop-blur-sm rounded-xl p-3">
                <button className="p-2 text-gray-800 hover:text-black transition-colors">
                  <Video className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-800 hover:text-black transition-colors">
                  <Mic className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-800 hover:text-black transition-colors">
                  <Settings className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-800 hover:text-black transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              {isLive && (
                <>
                  <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm text-black px-4 py-2 rounded-full flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">0 viewers</span>
                  </div>
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-gray-900/90 backdrop-blur-sm text-black px-4 py-2 rounded-full flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span className="font-medium">0 comments</span>
                    </div>
                    <div className="bg-gray-900/90 backdrop-blur-sm text-black px-4 py-2 rounded-full flex items-center space-x-2">
                      <Gift className="h-4 w-4" />
                      <span className="font-medium">0 gifts</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-gray-300/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Stream Layout</h2>
              <div className="grid grid-cols-2 gap-4">
                {layouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-colors ${
                      selectedLayout === layout.id
                        ? "bg-primary/20 border-2 border-primary/50"
                        : "bg-white/50 hover:bg-white"
                    }`}
                  >
                    <layout.icon className="h-8 w-8 text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-black">{layout.name}</h3>
                      <p className="text-sm text-gray-400">{layout.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stream Settings */}
          <div className="space-y-6">
            <div className="bg-gray-300/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Stream Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-800">Stream Title</Label>
                  <Input
                    placeholder="Enter stream title..."
                    className="mt-1 bg-white border-gray-200 text-black placeholder-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-gray-800">Category</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-white border-gray-200 text-black">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-800">Description</Label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full bg-white border border-gray-200 rounded-lg p-3 text-black placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Describe your stream..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-300/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Stream Features</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-black">Enable Chat</h3>
                    <p className="text-sm text-gray-400">Allow viewers to chat during stream</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-black">Gift Donations</h3>
                    <p className="text-sm text-gray-400">Allow viewers to send gifts</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium text-black">Auto-Record</h3>
                    <p className="text-sm text-gray-400">Save stream recording</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="bg-gray-300/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Stream Enhancement</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <Wand2 className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-black">AI Background Effects</h3>
                      <p className="text-sm text-gray-400">Enhance your stream background</p>
                    </div>
                  </div>
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-600/20 rounded-lg">
                      <ImageIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-black">Virtual Backgrounds</h3>
                      <p className="text-sm text-gray-400">Choose from preset backgrounds</p>
                    </div>
                  </div>
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}