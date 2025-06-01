"use client";

import { useState } from "react";
import Link from "next/link";
import { OTPInput } from "@/components/ui/input-otp";

export default function VerifyPage() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-primary text-transparent bg-clip-text mb-2">
            CELEBUT
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to your email address
          </p>
        </div>

        <form className="mt-8 space-y-6">
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
                        className={`w-10 h-12 flex items-center justify-center border rounded text-xl ${slot.isActive ? 'border-primary' : 'border-gray-300'
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
              <button className="text-primary hover:text-primary">Resend</button>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Verify Email
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
              href="/auth/sign-in"
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
