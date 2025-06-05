"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Share2,
  Gift,
  Award,
  Calendar,
  Download,
  Bookmark,
  MoreHorizontal,
  ArrowLeft,
  Camera,
} from "lucide-react";

interface Celebration {
  image: string;
  video?: string;
  author: string;
  avatar: string;
  description: string;
  date: string;
}

const celebrations: { [key: number]: Celebration } = {
  1: {
    video: "",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    
  },
};

export default function CelebrationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const celebration = celebrations[id];

  if (!celebration) return <div>Celebration not found</div>;

 return (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-lg">
      <div className="relative w-full h-screen">
        {celebration.video ? (
          <video
            src={celebration.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={celebration.image}
            alt={celebration.author}
            className="w-full h-full object-cover"
          />
        )}

        {/* Author info - top left */}
        <div className="absolute bottom-24 left-4 flex items-center space-x-3 z-10">
          <img
            src={celebration.avatar}
            alt={celebration.author}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white text-sm font-semibold">{celebration.author}</p>
            <p className="text-xs text-white/80">{celebration.date}</p>
          </div>
        </div>

        {/* Vertical icon bar */}
        <div className="absolute right-[-48px] top-1/4 flex flex-col items-center space-y-6 z-10">
          {[Gift, Award, Calendar, Download, Bookmark, MoreHorizontal].map((Icon, index) => (
            <button
              key={index}
              className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
            >
              <Icon className="h-6 w-6 text-gray-600" />
            </button>
          ))}
        </div>

        {/* Bottom overlay text & interaction */}
        <div className="absolute bottom-0 w-full px-4 py-4 bg-gradient-to-t from-black via-black/60 to-transparent text-white text-sm">
          <p className="mb-3">{celebration.description}</p>

          {/* Interaction bar with 4 items */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-1">
              <Heart className="w-6 h-6 text-yellow-300" />
              <span className="text-white text-sm">76</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-6 h-6 text-yellow-400" />
              <span className="text-white text-sm">45</span>
            </div>
            <Camera className="w-6 h-6 text-white" />
            <Share2 className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-full flex items-center space-x-2 shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>
      </div>
    </div>
  </div>
);
}