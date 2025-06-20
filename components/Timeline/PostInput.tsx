"use client";

import React, { useState } from "react";
import { Camera, Video } from "lucide-react";
import Image from "next/image";
import PostModal from "./PostModal"; // we'll create this next
import CelebrationIcon from '@/components/icons/celebration';

const PostInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgb(0,0,0,0.04)]">
        <div
          className="flex items-center space-x-3 mb-4 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt="User"
            className="h-10 w-10 rounded-xl"
          />
          <input
            type="text"
            placeholder="Speak to friends, family, fans and followers"
            readOnly
            className="flex-1 px-4 py-2 bg-gray-50 rounded-xl border-0 focus:outline-none cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button className="flex items-center justify-center space-x-2 pt-2.5 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <Camera className="h-5 w-5" />
            <span>Photo/Video</span>
          </button>
          <button className="flex items-center justify-center space-x-2 pt-2.5 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <CelebrationIcon
              width={20}
              height={20}
            />
            <span>Celebration</span>
          </button>
          <button className="flex items-center justify-center space-x-2 pt-2.5 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <Video className="h-5 w-5" />
            <span>Celevision</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && <PostModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default PostInput;
