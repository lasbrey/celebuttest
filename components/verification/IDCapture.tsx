import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FileCheck2 } from "lucide-react";

interface IDCaptureProps {
  onBack: () => void;
}

const IDCapture: React.FC<IDCaptureProps> = ({ onBack }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm max-w-4xl mx-auto">
    <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </button>

    <h1 className="text-2xl font-semibold mb-2">National ID</h1>
    <p className="text-gray-600 mb-6">
      Take a clear photo of the front of your government ID
    </p>

    <div className="aspect-video bg-amber-50 rounded-lg flex items-center justify-center mb-6">
      <FileCheck2 className="h-16 w-16 text-amber-300" />
    </div>

    <Button className="w-full">
      Take Photo
    </Button>
  </div>
);

export default IDCapture;