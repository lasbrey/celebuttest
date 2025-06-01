import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface IdType {
  id: string;
  label: string;
}

interface IDTypeProps {
  onBack: () => void;
  onSelectIdType: (idType: string) => void;
}

const idTypes: IdType[] = [
  { id: "drivers", label: "Driver License" },
  { id: "national", label: "National ID" },
  { id: "passport", label: "Passport" },
  { id: "residence", label: "Residency Permit" },
  { id: "voter", label: "Voter ID" },
];

const IDType: React.FC<IDTypeProps> = ({ onBack, onSelectIdType }) => (
  <div className="bg-white rounded-2xl p-6 shadow-= max-w-2xl mx-auto">
    <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </button>

    <h1 className="text-2xl font-semibold mb-2">Upload a Photo ID</h1>
    <p className="text-gray-600 mb-6">
      We require a photo of a government ID to verify your identity
    </p>

    <div className="space-y-3">
      {idTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelectIdType(type.id)}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <span>{type.label}</span>
          <ArrowLeft className="h-5 w-5 transform rotate-180" />
        </button>
      ))}
    </div>
  </div>
);

export default IDType;