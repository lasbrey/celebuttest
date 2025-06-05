"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface Story {
  id: number;
  name: string;
  img: string;
}

const storyData: Story[] = [
  { id: 1, name: "Alice Smith", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "John Doe", img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Emily Johnson", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Michael Brown", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Sophia Wilson", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Sophia Wilson", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Sophia Wilson", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80" },
];

const Stories: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setTimeout(checkScrollPosition, 300);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          <ChevronLeft size={14} />
        </button>
      )}

      {/* Scrollable Stories */}
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth w-full"
      >
        {/* First Card - Create Story */}
        <div className="flex-shrink-0 relative cursor-pointer transition-transform transform hover:scale-105">
          <div className="w-28 h-40 rounded-2xl overflow-hidden bg-gray-200 flex flex-col items-center justify-center border-2 border-dashed border-primary">
            <Plus size={32} className="text-primary" />
            <span className="text-sm font-semibold text-gray-600 mt-2 text-center">Your Celebration</span>
          </div>
        </div>

        {/* Other Stories */}
        {storyData.map((story) => (
          <div key={story.id} className="flex-shrink-0 relative cursor-pointer transition-transform transform hover:scale-105">
            <div className="w-28 h-40 rounded-2xl overflow-hidden">
              <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl p-2 shadow-lg">
              <div className="flex flex-row items-center space-x-2">
                <img src={story.img} alt={story.name} className="h-5 w-5 rounded-md border-2 border-white object-cover" />
                <div className="text-white text-sm font-medium mt-1 w-20 truncate text-center">{story.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Stories;
