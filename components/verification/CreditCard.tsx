import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, ArrowLeft } from "lucide-react";

interface VerificationCreditCardProps {
    onBack: () => void;
    // onNext: () => void;
}

const CreditCardVerification: React.FC<VerificationCreditCardProps> = ({onBack}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log("Payment Data:", data);
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-= max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center text-gray-600 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
    
            <h1 className="text-2xl font-semibold mb-2">Enter Payment Information</h1>
            <p className="text-gray-600 mb-6 text-sm">
                To start your subscription, input your card details to make payment. <br />
                You will be redirected to your bank's authorization page.
            </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Cardholder Name */}
                    <div>
                        <Label htmlFor="cardholder">Cardholder’s Name</Label>
                        <Input
                            id="cardholder"
                            placeholder="Enter card holders name"
                            {...register("cardholder", { required: true })}
                        />
                        {errors.cardholder && <span className="text-red-500 text-sm">Cardholder name is required</span>}
                    </div>

                    {/* Card Number */}
                    <div className="relative">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                            </span>
                            <Input
                                id="cardNumber"
                                placeholder="•••• •••• •••• ••••"
                                className="pl-10"
                                {...register("cardNumber", { required: true })}
                            />
                        </div>
                        {errors.cardNumber && <span className="text-red-500 text-sm">Card number is required</span>}
                    </div>

                    {/* Expiry & CVC */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input
                                id="expiry"
                                placeholder="mm / yyyy"
                                {...register("expiry", { required: true })}
                            />
                            {errors.expiry && <span className="text-red-500 text-sm">Expiry date is required</span>}
                        </div>

                        <div className="flex-1">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                                id="cvc"
                                placeholder="•••"
                                {...register("cvc", { required: true })}
                            />
                            {errors.cvc && <span className="text-red-500 text-sm">CVC is required</span>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                        Authorize
                    </Button>
                </form>
        </div>
    );
};

export default CreditCardVerification;
