import React from "react";
import { Star, Camera, Hash, AtSign, Video } from "lucide-react"; // Ensure you have these icons available

const PostInput = () => {
    return (
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-2">
                <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                    alt="User"
                    className="h-10 w-10 rounded-md"
                />
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="ml-2 bg-primary text-white px-4 py-2 rounded-lg">
                    Share Post
                </button>
            </div>
            <div className="grid grid-cols-3 space-x-4 mt-2 items-center border-t">
                <div className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <Camera className="h-5 w-5" />
                    <span>Image/Video</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <Star className="h-5 w-5" />
                    <span>Celebration</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <Video className="h-5 w-5" />
                    <span>Celevision</span>
                </div>
            </div>
        </div>
    );
};

export default PostInput;