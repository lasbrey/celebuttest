'use client'
import { useState } from "react";
import CelebrationTypeSelection from "@/components/celebration/CelebrationTypeSelection";
import FriendSelection from "@/components/celebration/FriendSelection";
import MediaUpload from "@/components/celebration/MediaUpload";

interface Friend {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export default function CreatePage() {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([]);

  return (
    <div className="min-h-screen">
       <div className="px-4 py-8">
        {step === 1 && (
          <CelebrationTypeSelection 
            onContinue={() => setStep(2)} 
            selectedType={selectedType} 
            setSelectedType={setSelectedType} 
          />
        )}
        {step === 2 && (
          <FriendSelection 
            onBack={() => setStep(1)} 
            onContinue={() => setStep(3)} 
            selectedFriend={selectedFriend} 
            setSelectedFriend={setSelectedFriend} 
          />
        )}
        {step === 3 && (
          <MediaUpload 
            onBack={() => setStep(2)} 
          />
        )}
      </div>
    </div>
  );
}
