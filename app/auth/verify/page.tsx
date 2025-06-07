"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { OTPInput } from "@/components/ui/input-otp";
import { apiClient, ConfirmEmailPayload } from "@/lib/api";
import Image from "next/image";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload: ConfirmEmailPayload = {
        email: email,
        token: code,
      };

      const response = await apiClient.confirmEmail(payload);

      if (response.error) {
        setError(response.message || response.error);
      } else {
        // Email verified successfully - redirect to login
        router.push('/?verified=true');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email address is required to resend code");
      return;
    }

    setIsResending(true);
    setError("");

    try {
      // Note: You might need to implement a resend endpoint in your API
      // For now, we'll show a success message
      setTimeout(() => {
        setIsResending(false);
        setError(""); // Clear any previous errors
        // You could show a success message here
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification code');
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-primary text-transparent bg-clip-text mb-2">
            <Image src="/logo.png" width={150} height={32} alt="Logo" />
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to {email || 'your email address'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter Verification Code
            </label>
            <div className="flex justify-center">
              <OTPInput
                value={code}
                onChange={setCode}
                maxLength={6}
                containerClassName="group flex items-center has-[:disabled]:opacity-30"
                render={({ slots }) => (
                  <>
                    {slots.map((slot, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-12 flex items-center justify-center border rounded text-xl mx-1 ${
                          slot.isActive ? 'border-primary' : 'border-gray-300'
                        }`}
                      >
                        {slot.char ?? ""}
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
            <p className="text-center text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button 
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-primary hover:text-primary disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <Loader2 className="inline animate-spin h-3 w-3 mr-1" />
                    Resending...
                  </>
                ) : (
                  'Resend'
                )}
              </button>
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
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