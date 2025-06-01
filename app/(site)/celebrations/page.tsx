"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Stories from "@/components/celebration/Stories";

const celebrations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "4/5",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "1/1",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "3/4",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "4/3",
    promotion: true,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "1/1",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1527015175922-36a306cf0e20?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "3/4",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "4/3",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    aspectRatio: "4/5",
    promotion: true,
  },
];

export default function CelebrationsPage() {
  return (
    <div >
       <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Celebrations</h1>
          <Link
            href="/createcelebration"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/50"
          >
           Create Celebration
          </Link>
        </div>
      <Stories />

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 mx-auto ">
        {celebrations.map((celebration) => (
          <Link
            key={celebration.id}
            href={`/celebrations/${celebration.id}`}
            className="block mb-4 relative group"
          >
            <div
              className="relative rounded-xl overflow-hidden break-inside-avoid"
              style={{ aspectRatio: celebration.aspectRatio }}
            >
              <img
                src={celebration.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={celebration.avatar}
                      alt={celebration.author}
                      className="h-8 w-8 rounded-xl border-2 border-white"
                    />
                    <span className="text-white font-medium">{celebration.author}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-3">
                    <button className="flex items-center space-x-1 text-white">
                      <Heart className="h-5 w-5" />
                      <span>76</span>
                    </button>
                    <button className="flex items-center space-x-1 text-white">
                      <MessageCircle className="h-5 w-5" />
                      <span>45</span>
                    </button>
                    <button className="flex items-center space-x-1 text-white">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              {celebration.promotion && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-sm font-medium">
                  Promotion
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}