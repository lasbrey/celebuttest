// VerifyPage.tsx
"use client";
import { useState } from "react";
import PaymentPlan from "@/components/verification/PaymentPlan";
import IDType from "@/components/verification/IDType";
import IDCapture from "@/components/verification/IDCapture";
import VerificationInstructions from "@/components/verification/VerificationInstructions";
import VerificationMethod from "@/components/verification/VerificationMethod";
import CreditCardVerification from "@/components/verification/CreditCard";

const VerifyPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedIdType, setSelectedIdType] = useState<string>("");



  const handleIdSelection = (idType: string) => {
    setSelectedIdType(idType);
    setStep(5);
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        {step === 1 && <PaymentPlan onNext={() => setStep(2)} />}
        {step === 2 && (
          <VerificationMethod
            onBack={() => setStep(1)}
            idCard={() => setStep(3)}
            creditCard={() => setStep(6)}
          />
        )}
        {step === 3 && <VerificationInstructions onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <IDType onBack={() => setStep(3)} onSelectIdType={handleIdSelection} />}
        {step === 5 && <IDCapture onBack={() => setStep(4)} />}
        {step === 6 && <CreditCardVerification onBack={() => setStep(2)} />}
      </div>
    </div>
  );
};

export default VerifyPage;