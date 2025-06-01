import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, FileCheck2, LucideProps } from "lucide-react";

interface VerificationMethod {
  id: string;
  title: string;
  icon: React.FC<LucideProps>;
}

interface VerificationMethodProps {
  onBack: () => void;
  idCard: () => void;
  creditCard: () => void;
}

const verificationMethods: VerificationMethod[] = [
  {
    id: "credit",
    title: "Securely verify your identity by providing your credit card information.",
    icon: CreditCard,
  },
  {
    id: "government",
    title: "Confirm your identity by uploading a copy of your government-issued ID.",
    icon: FileCheck2,
  },
];

const VerificationMethod: React.FC<VerificationMethodProps> = ({ onBack, idCard, creditCard }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
    <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </button>

    <h1 className="text-2xl font-semibold mb-2">Verify Your Account</h1>
    <p className="text-gray-600 mb-6">
      To ensure the security of your account,
      <br />please complete one of the verification methods below.
    </p>

    {verificationMethods.map((method) => (
      <div key={method.id} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50" id={method.id}>
        <method.icon className="h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <Label htmlFor={method.id}>{method.title}</Label>
        </div>
      </div>
    ))}

    <Button onClick={creditCard} className="w-full mt-6">
      Verify with Credit Card
    </Button>
    <Button onClick={idCard} className="w-full mt-6">
      Verify with Government ID
    </Button>
  </div>
);

export default VerificationMethod;
