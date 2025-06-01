import { Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const ProfileHeader = () => {
  return (
    <div className="relative -mt-24 mb-8 flex justify-between items-end">
      <div className="flex items-end">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt="Profile"
            className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg"
          />
        </div>
        <div className="ml-6 mb-6">
          <h1 className="text-3xl font-bold">Alice Smith</h1>
          <p className="text-gray-600">@alicesmith</p>
          <p className="mt-2 text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus eros eu vehicula interdum.
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="bg-white text-primary px-6 py-2 rounded-lg border hover:bg-gray-50">
          <Share2 className="h-5 w-5" />
        </button>
        <Link href="/profile/edit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary">
         Edit Profile
        </Link>
        <button className="bg-white text-gray-600 px-3 py-2 rounded-lg border hover:bg-gray-50">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
