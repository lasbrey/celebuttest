import { Mail, Globe, MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">About</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail className="h-5 w-5" />
          <span>Example@mail.com</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Globe className="h-5 w-5" />
          <span>aklihakikihasibuan.com</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="h-5 w-5" />
          <span>From North Sumatra</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
