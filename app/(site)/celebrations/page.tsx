"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Stories from "@/components/celebration/Stories";
import celebrations from "@/data/celebration.json";

export default function CelebrationsPage() {

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Celebrations</h1>
        <Link
          href="/createcelebration"
          className="bg-[#F5BD4B] text-white px-4 py-2 rounded-lg hover:bg-primary/50"
        >
          Create Celebration
        </Link>
      </div>

      <Stories />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1">
        {celebrations.map((celebration) => (
          <Link
            key={celebration.id}
            href={`/celebrations/${celebration.id}`}
            className={`relative group ${celebration.promotion ? "xl:col-span-2 xl:row-span-2" : ""
              }`}
          >
            <div
              className={`relative rounded-xl overflow-hidden w-full h-full`}
              style={{
                aspectRatio: celebration.promotion ? "auto" : celebration.aspectRatio,
              }}
            >
              {celebration.type === "video" ? (
                <video
                  src={celebration.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <img
                  src={celebration.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-row items-center space-x-2">
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
