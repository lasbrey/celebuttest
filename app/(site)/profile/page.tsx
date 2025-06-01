import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutSection from "@/components/profile/AboutSection";
import FriendsSection from "@/components/profile/FriendsSection";
import CelebrationSection from "@/components/profile/CelebrationSection";
import TabsSection from "@/components/profile/TabsSection";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="h-80 bg-gradient-to-r from-amber-100 to-orange-100 relative">
        <img
          src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1600&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <ProfileHeader />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <TabsSection />
            <CelebrationSection />

          </div>
          <div className="grid gap-5">
            <AboutSection />
            <FriendsSection />
          </div>

          {/* Celebration Section */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
