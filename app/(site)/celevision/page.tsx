"use client";

import Link from "next/link";
import { Search, TrendingUp, Users, Star, Play, Crown, Filter } from "lucide-react";

const featuredStreams = [
  {
    id: 1,
    title: "Birthday Party Live!",
    streamer: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    viewers: 1234,
    category: "Celebrations",
  },
  {
    id: 2,
    title: "Wedding Ceremony",
    streamer: "John & Sarah",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
    viewers: 2567,
    category: "Weddings",
  },
  {
    id: 3,
    title: "Graduation Day 2024",
    streamer: "University Events",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    viewers: 987,
    category: "Education",
  },
];

const categories = [
  { name: "Celebrations", icon: "🎉", count: 125 },
  { name: "Weddings", icon: "💍", count: 84 },
  { name: "Birthdays", icon: "🎂", count: 256 },
  { name: "Graduations", icon: "🎓", count: 92 },
  { name: "Anniversaries", icon: "💑", count: 147 },
  { name: "Baby Showers", icon: "👶", count: 73 },
];

const recommendedStreams = [
  {
    id: 4,
    title: "Anniversary Celebration",
    streamer: "Mike & Emma",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    viewers: 456,
    category: "Anniversaries",
  },
  {
    id: 5,
    title: "Baby Shower Party",
    streamer: "Lisa Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80",
    viewers: 789,
    category: "Baby Showers",
  },
];
const streams = [
  {
    id: 1,
    title: "Birthday Party Live!",
    streamer: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    viewers: 1234,
    category: "Celebrations",
    tags: ["birthday", "party", "live"],
  },
  {
    id: 2,
    title: "Wedding Ceremony",
    streamer: "John & Sarah",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
    viewers: 2567,
    category: "Weddings",
    tags: ["wedding", "ceremony", "love"],
  },
  {
    id: 3,
    title: "Graduation Day 2024",
    streamer: "University Events",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    viewers: 987,
    category: "Education",
    tags: ["graduation", "education", "celebration"],
  },
  {
    id: 4,
    title: "Anniversary Celebration",
    streamer: "Mike & Emma",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    viewers: 456,
    category: "Anniversaries",
    tags: ["anniversary", "love", "celebration"],
  },
];

export default function CelevisionPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 ">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Celevision</h1>
          <Link
            href="/celevision/create"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/50"
          >
            Start Streaming
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search streams..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Featured Streams */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Streams</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStreams.map((stream) => (
              <Link
                key={stream.id}
                href={`/celevision/stream/${stream.id}`}
                className="group block"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={stream.avatar}
                        alt={stream.streamer}
                        className="w-8 h-8 rounded-xl border-2 border-white"
                      />
                      <div>
                        <h3 className="text-white font-medium">{stream.title}</h3>
                        <p className="text-white/80 text-sm">{stream.streamer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-2 py-1 rounded-xl flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{stream.viewers}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm px-2 py-1 rounded-xl">
                    {stream.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} live streams</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Streams */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4" />
              <span>Based on your interests</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedStreams.map((stream) => (
              <Link
                key={stream.id}
                href={`/celevision/stream/${stream.id}`}
                className="group block"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={stream.avatar}
                        alt={stream.streamer}
                        className="w-8 h-8 rounded-xl border-2 border-white"
                      />
                      <div>
                        <h3 className="text-white font-medium">{stream.title}</h3>
                        <p className="text-white/80 text-sm">{stream.streamer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-2 py-1 rounded-xl flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{stream.viewers}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm px-2 py-1 rounded-xl">
                    {stream.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 pt-10">
            <h2 className="text-xl font-semibold">Gaming</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {streams.map((stream) => (
              <Link
                key={stream.id}
                href={`/celevision/stream/${stream.id}`}
                className="group block"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={stream.avatar}
                        alt={stream.streamer}
                        className="w-8 h-8 rounded-xl border-2 border-white"
                      />
                      <div>
                        <h3 className="text-white font-medium">{stream.title}</h3>
                        <p className="text-white/80 text-sm">{stream.streamer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-2 py-1 rounded-xl flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{stream.viewers}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm px-2 py-1 rounded-xl">
                    {stream.category}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {stream.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-xl"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 pt-10">
            <h2 className="text-xl font-semibold">IRL</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {streams.map((stream) => (
              <Link
                key={stream.id}
                href={`/celevision/stream/${stream.id}`}
                className="group block"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={stream.avatar}
                        alt={stream.streamer}
                        className="w-8 h-8 rounded-xl border-2 border-white"
                      />
                      <div>
                        <h3 className="text-white font-medium">{stream.title}</h3>
                        <p className="text-white/80 text-sm">{stream.streamer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm px-2 py-1 rounded-xl flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{stream.viewers}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-sm px-2 py-1 rounded-xl">
                    {stream.category}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {stream.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-xl"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}