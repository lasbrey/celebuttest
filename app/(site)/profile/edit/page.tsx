"use client";

import { useState } from "react";
import { ArrowLeft, Camera, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditProfilePage() {
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=80");


  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="h-80 bg-gradient-to-r from-amber-100 to-orange-100 relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button className="absolute cursor-pointer bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-sm hover:bg-white transition-colors">
          <Camera className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto px-4">
        <div className="relative -mt-24 mb-8">
          <div className="relative inline-block">
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-sm hover:bg-white transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center text-gray-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <div className="flex space-x-3">
              <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary">
                Save
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium">Username</Label>
              <div className="mt-1 relative">
                <Input
                  type="text"
                  placeholder="slothui.com/"
                  value="X-AE-A-19"
                  className=""
                />
                
                <Info className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Phone Number</Label>
              <div className="mt-1 relative">
                <Input
                  type="tel"
                  placeholder="+44 (158) 008-9987"
                  value="+44 (158) 008-9987"
                  className="pl-16"
                />
                <select className="absolute inset-y-0 left-0 w-14 bg-transparent border-r px-2 text-gray-500">
                  <option>🇬🇧</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Biography</Label>
              <div className="mt-1">
                <textarea
                  className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Write something about yourself..."
                  defaultValue="Hi there! 👋 I'm Alice Smith, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym."
                />
                <p className="mt-1 text-sm text-gray-500 text-right">255 characters remaining</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Notifications</h3>
              
              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <Label>Email Notification</Label>
                  <p className="text-sm text-gray-500">You will be notified when a new email arrives.</p>
                </div>
                <Checkbox />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <Label>Sound Notification</Label>
                  <p className="text-sm text-gray-500">You will be notified with sound when someone messages you.</p>
                </div>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <Label>Subscription</Label>
                  <p className="text-sm text-gray-500">You will be notified when you subscribe to an account.</p>
                </div>
                <Checkbox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}