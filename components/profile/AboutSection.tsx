"use client";
import { Mail, Globe, MapPin, Building, Calendar, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AboutSection = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-white rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">About</h3>
      <div className="space-y-3">
        {user.email && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="h-5 w-5" />
            <span>{user.email}</span>
          </div>
        )}
        
        {user.phone_number && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="h-5 w-5" />
            <span>{user.phone_number}</span>
          </div>
        )}

        {user.account_type === 'business' && user.industry && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Building className="h-5 w-5" />
            <span className="capitalize">{user.industry}</span>
          </div>
        )}

        {user.date_of_birth && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>Born {new Date(user.date_of_birth).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center space-x-2 text-gray-600">
          <Globe className="h-5 w-5" />
          <span>celebut.com/{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;