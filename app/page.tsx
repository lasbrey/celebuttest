import Stories from "@/components/celebration/Stories";
import Header from "@/components/layout/Header";
import LeftSideBar from "@/components/layout/LeftSideBar";
import RightSideBar from "@/components/layout/RightSideBar";
import PostInput from "@/components/Timeline/PostInput";
import Posts from "@/components/Timeline/Posts";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Main Wrapper - Flex Layout */}
      <div className="flex flex-1 overflow-hidden bg-[#f2f4f7] px-5">
        
        {/* Left Sidebar with Independent Scrolling */}
        <div className="hidden md:block w-72 overflow-y-auto h-full">
          <LeftSideBar />
        </div>

        {/* Main Content with Independent Scrolling */}
        <main className="flex-1 overflow-y-auto h-full pt-5 px-4 max-w-4xl mx-auto">
          <Stories />
          <PostInput />
          <Posts />
        </main>

        {/* Right Sidebar with Independent Scrolling */}
        <div className="hidden md:block w-80 overflow-y-auto h-full">
          <RightSideBar />
        </div>

      </div>
    </div>
  );
}
