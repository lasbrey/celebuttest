'use client';

import Stories from "@/components/celebration/Stories";
import PostInput from "@/components/Timeline/PostInput";
import Posts from "@/components/Timeline/Posts";
import SearchBar from "@/components/Timeline/SearchBar";
import RightSideBar from '@/components/layout/RightSideBar';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] max-w-[1440px] w-full mx-auto h-screen overflow-hidden">
      <div className="overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <SearchBar />
        </div>

        <div className="flex flex-col gap-2 lg:max-w-2xl mx-auto pt-6 pb-20">
          <Stories />
          <PostInput />
          <Posts />
        </div>
      </div>

      <aside className="hidden lg:block h-screen overflow-y-auto border-l border-gray-100 bg-white">
        <RightSideBar />
      </aside>
    </div>
  );
}