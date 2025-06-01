"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

interface Celebration {
  image: string;
  author: string;
  avatar: string;
  description: string;
  date: string;
}

const celebrations: { [key: number]: Celebration } = {
  1: {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    description: "Birthday wishes are special moments that deserve to be shared. Here's to another year of joy, growth, and unforgettable memories! 🎉 #Celebration #Birthday #SpecialMoments",
    date: "March 15, 2024",
  },
};

// export function generateStaticParams() {
//   return Object.keys(celebrations).map((id) => ({
//     id: id.toString(),
//   }));
// }


export default function CelebrationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const celebration = celebrations[id];

  if (!celebration) {
    return <div>Celebration not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Celebrations</span>
        </button>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="relative aspect-[4/3]">
            <img
              src={celebration.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute right-4 top-4 space-y-2">
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm hover:bg-white transition-colors">
                <Gift className="h-6 w-6" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm hover:bg-white transition-colors">
                <Award className="h-6 w-6" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm hover:bg-white transition-colors">
                <Calendar className="h-6 w-6" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm hover:bg-white transition-colors">
                <Download className="h-6 w-6" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm hover:bg-white transition-colors">
                <Bookmark className="h-6 w-6" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm hover:bg-white transition-colors">
                <MoreHorizontal className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={celebration.avatar}
                  alt={celebration.author}
                  className="h-12 w-12 rounded-xl"
                />
                <div>
                  <h3 className="font-semibold">{celebration.author}</h3>
                  <p className="text-sm text-gray-500">{celebration.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600">
                  <Heart className="h-6 w-6" />
                  <span>76</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600">
                  <MessageCircle className="h-6 w-6" />
                  <span>45</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{celebration.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}