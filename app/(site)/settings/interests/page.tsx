"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const interests = [
  "News and Events",
  "Entertainment",
  "Lifestyle",
  "History",
  "Personal Development",
  "Humor and Memes",
  "Sports",
  "Science",
  "Animals",
  "Education",
  "Technology",
  "Product and Brand",
  "Marketing",
  "Scary Things",
  "Movies",
  "Music",
];

export default function InterestsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/settings" className="text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Choose Your Area of Interest</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 mb-6">
            You can customize your feed by following topics or people that interest you the most
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {interests.map((interest, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md border hover:bg-gray-50 ${
                  index % 4 === 0 ? "bg-amber-100 text-amber-800 border-amber-200" : ""
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <button className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}