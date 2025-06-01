"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: number;
  name: string;
  img: string;
}

const storyData: Story[] = [
  { id: 1, name: "Alice Smith", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "John Doe", img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Emily Johnson", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEyfHxmYWNlfGVufDB8fHx8MTYzNzE3MDUwMA&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Michael Brown", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Sophia Wilson", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDd8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "David Martinez", img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDh8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Olivia Taylor", img: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "James Anderson", img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 9, name: "James Anderson", img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 10, name: "James Anderson", img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGZhY2V8ZW58MHx8fHwxNjM3MTcwNTAw&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
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
      {/* Left Arrow (hidden if at start) */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Stories Container */}
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth w-full"
      >
        {storyData.map((story) => (
          <div key={story.id} className="flex-shrink-0 relative cursor-pointer transition-transform transform hover:scale-105">
            <div className="w-28 h-40 rounded-2xl overflow-hidden">
              <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl p-2">
              <div className="flex flex-col items-center">
                {/* Fixed-size image for uniform look */}
                <img src={story.img} alt={story.name} className="h-8 w-8 rounded-md border-2 border-white object-cover" />
                <div className="text-white text-sm font-medium mt-1 w-20 truncate text-center">{story.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow (hidden if at end) */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white p-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Hidden Scrollbar Styling */}
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
