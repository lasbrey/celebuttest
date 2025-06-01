import React, { useState } from 'react';

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  recommended?: boolean;
}

interface PaymentPlanProps {
  onNext: () => void;
}

const plans: Plan[] = [
  {
    name: "Premium",
    monthlyPrice: "$10/Mo",
    yearlyPrice: "$99/Yr",
    features: [
      "Feature label goes here",
      "Feature label goes here",
      "Feature label goes here",
    ],
  },
  {
    name: "Premium Plus",
    monthlyPrice: "$25/Mo",
    yearlyPrice: "$249/Yr",
    features: [
      "Feature label goes here",
      "Feature label goes here",
      "Feature label goes here",
      "Feature label goes here",
    ],
    recommended: true,
  },
];

const PaymentPlan: React.FC<PaymentPlanProps> = ({ onNext }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-center mb-2">Verify Your Account</h1>
      <p className="text-gray-600 text-center mb-6">
        To verify your account and enjoy full access to all features,
        <br />please choose a payment option below:
      </p>

      <div className="flex justify-center mb-6 ">
        <button
          className={`px-4 py-2 w-48 border ${billingCycle === 'monthly' ? 'bg-yellow-500 text-white' : ' text-primary'}`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 w-48 border ${billingCycle === 'yearly' ? 'bg-yellow-500 text-white' : ' text-primary'}`}
          onClick={() => setBillingCycle('yearly')}
        >
          Yearly
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl p-6 ${plan.recommended ? "bg-amber-100 border-2 border-amber-200" : "bg-gray-50"
              }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3 right-4 bg-amber-600 text-white text-xs px-3 py-1 rounded-md">
                RECOMMENDED
              </span>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">
              {billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice}
            </p>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onNext}
              className={`mt-6 w-full py-2 px-4 rounded-lg ${plan.recommended ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-yellow-100 text-gray-800 hover:bg-gray-100"
                }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPlan;
