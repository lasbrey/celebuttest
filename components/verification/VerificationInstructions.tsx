import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Info } from "lucide-react";

interface VerificationInstructionsProps {
  onBack: () => void;
  onNext: () => void;
}

const VerificationInstructions: React.FC<VerificationInstructionsProps> = ({ onBack, onNext }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
    <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </button>

    <h1 className="text-2xl font-semibold mb-2">Verify Your ID</h1>
    <p className="text-gray-600 mb-6">Before you start, please:</p>

    <div className="space-y-4 mb-8">
      <div className="flex items-center space-x-3">
        <div className="h-2 w-2 rounded-md bg-amber-400" />
        <span>Have your valid government-issued ID ready</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="h-2 w-2 rounded-md bg-amber-400" />
        <span>Make sure you are in a well-lit room</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="h-2 w-2 rounded-md bg-amber-400" />
        <span>Be prepared to take a selfie and photo of your ID</span>
      </div>
    </div>

    <div className="bg-yellow-50 rounded-lg p-4 mb-8">
      <div className="flex items-start space-x-3">
        <Info className="h-5 w-5 text-primary mt-0.5" />
        <p className="text-sm text-primary">
          By clicking the button below, you consent to Celebut securely collecting, using, and
          sharing high-quality service providers to process your biometric information to verify your identity.
          Your identity information will only be used for this purpose.
        </p>
      </div>
    </div>

    <Button onClick={onNext} className="w-full">
      Begin Verification
    </Button>
  </div>
);

export default VerificationInstructions;