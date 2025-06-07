"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Loader2 } from "lucide-react";
import { apiClient, ResetPasswordRequestPayload } from "@/lib/api";
import { COUNTRY_CODES, formatPhoneNumber } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!phoneNumber.trim()) {
        setError("Phone number is required");
        setIsLoading(false);
        return;
      }

      if (phoneNumber.replace(/\D/g, '').length < 10) {
        setError("Please enter a valid phone number");
        setIsLoading(false);
        return;
      }

      const payload: ResetPasswordRequestPayload = {
        phone_number: formatPhoneNumber(selectedCountryCode, phoneNumber),
      };

      const response = await apiClient.requestPasswordReset(payload);

      if (response.error) {
        setError(response.message || response.error);
      } else {
        setSuccess(true);
        // Redirect to reset confirmation page
        setTimeout(() => {
          router.push(`/auth/reset-password?phone=${encodeURIComponent(payload.phone_number)}`);
        }, 2000);
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred while requesting password reset');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-primary text-transparent bg-clip-text mb-2">
              <Image src="/logo.png\" width={150} height={32} alt="Logo" />
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900">Code Sent!</h2>
            <p className="mt-2 text-gray-600">
              We've sent a verification code to your phone number. You'll be redirected to enter the code shortly.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600 text-sm text-center">
              Verification code sent successfully!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-primary text-transparent bg-clip-text mb-2">
            <Image src="/logo.png" width={150} height={32} alt="Logo" />
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">
            Enter your phone number and we'll send you a verification code
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 flex">
              <Select value={selectedCountryCode} onValueChange={setSelectedCountryCode}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 relative ml-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Sending Code...
                </>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">OR</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Back to Sign in
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <p>Copyright 2025 CELEBUT ©</p>
          <div className="space-x-4">
            <Link href="/privacy" className="text-primary hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}