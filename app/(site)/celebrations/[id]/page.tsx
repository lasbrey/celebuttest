"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import CommentDialog from "@/components/celebration/Modals/CommentDialog";
import Cashgift from "@/components/celebration/Modals/Cashgift";
import ShareDialog from "@/components/celebration/Modals/ShareDialog";
interface Celebration {
  type: "image" | "video";
  media: string;
  author: string;
  avatar: string;
  description: string;
  date: string;
}

const celebrations: { [key: number]: Celebration } = {
  1: {
    type: "image",
    media: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    author: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    description:
      "Birthday wishes are special moments that deserve to be shared. Here's to another year of joy, growth, and unforgettable memories! 🎉",
    date: "March 15, 2024",
  },
};

export default function CelebrationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const celebration = celebrations[id];
  const actionIcons = [
  { src: "/icons/gift.svg", alt: "Gift", onClick: () => handleCelebrationClick() },
  { src: "/icons/drink.svg", alt: "Drink" },
  { src: "/icons/birthday.svg", alt: "Birthday" },
  { src: "/icons/flower.svg", alt: "Flower" },
  { src: "/icons/GiftCard.svg", alt: "GiftCard" },
  { src: "/icons/resturant.svg", alt: "Resturant" },
  { src: "/icons/wishlist.svg", alt: "Wishlist" },
];
  const [commentDialogOpen, setcommentDialogOpen] = useState(false);
  const [shareDialogOpen, setshareDialogOpen] = useState(false);
  const [celebrateDialogOpen, setcelebrateDialogOpen] = useState(false);

  const handleMessageClick = () => {
    setcommentDialogOpen(true);
  };
  const handleShareClick = () => {
    setshareDialogOpen(true);
  };
  const handleCelebrationClick = () => {
    setcelebrateDialogOpen(true);
  };

  if (!celebration) return <div>Celebration not found</div>;

  return (
    <div className="h-[90vh] flex justify-center mt-10">
      <div className="relative h-full w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-lg">
        {celebration.type === "video" ? (
          <video
            src={celebration.media}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={celebration.media}
            alt={celebration.author}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute right-4 top-1/4 flex flex-col items-center space-y-6 z-10">
          {actionIcons.map((icon, index) => (
            <button
              key={index}
              onClick={icon.onClick}
              className="bg-black/30 backdrop-blur-sm p-2 rounded-full shadow-md transition-all duration-200"
            >
              <Image src={icon.src} alt={icon.alt} width={24} height={24} />
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 w-full px-4 py-4 bg-gradient-to-t from-black via-black/60 to-transparent text-white text-sm">
          <p className="mb-3">{celebration.description}</p>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-1">
              <Image src="/icons/celebrate.svg" alt="Celebrate" width={40} height={40} />
              <span className="text-white text-sm">76</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleMessageClick()}>
              <MessageCircle className="w-8 h-8 text-white" />
              <span className="text-white text-sm">45</span>
            </div>
            <Image className="cursor-pointer" src="/icons/sharecelebration.svg" alt="Share" width={30} height={30} onClick={() => handleShareClick()} />
            <Image className="cursor-pointer" src="/icons/time.svg" alt="Time" width={30} height={30} />
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-full flex items-center space-x-2 shadow"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <CommentDialog commentDialogOpen={commentDialogOpen} setcommentDialogOpen={setcommentDialogOpen} />
      <Cashgift celebrateDialogOpen={celebrateDialogOpen} setcelebrateDialogOpen={setcelebrateDialogOpen} />
      <ShareDialog shareDialogOpen={shareDialogOpen} setshareDialogOpen={setshareDialogOpen} />

    </div>
  );
}