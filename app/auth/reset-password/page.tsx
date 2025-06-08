"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { OTPInput } from "@/components/ui/input-otp";
import { ResetPasswordConfirmPayload } from "@/types/auth";
import { authApi } from "@/api/apiClient";
import { validatePassword } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    if (phoneParam) {
      setPhoneNumber(decodeURIComponent(phoneParam));
    }
  }, [searchParams]);

  const checkPasswordStrength = (password: string) => {
    const validation = validatePassword(password);
    setPasswordStrength(validation.strength);

    if (password && !validation.isValid) {
      setErrors(prev => ({ ...prev, password: validation.errors[0] }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);

    // Clear confirm password error if passwords now match
    if (confirmPassword && newPassword === confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if passwords match
    if (password && newConfirmPassword !== password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form
      const newErrors: Record<string, string> = {};

      if (code.length !== 6) {
        newErrors.code = 'Please enter a valid 6-digit code';
      }

      if (!password) {
        newErrors.password = 'Password is required';
      } else {
        const validation = validatePassword(password);
        if (!validation.isValid) {
          newErrors.password = validation.errors[0];
        }
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!phoneNumber) {
        newErrors.general = 'Phone number is required';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const payload: ResetPasswordConfirmPayload = {
        password: password,
        phone_number: phoneNumber,
        token: code,
      };

      const response = await authApi.confirmPasswordReset(payload);

      if (response.error) {
        setErrors({ general: response.message || response.error });
      } else {
        // Password reset successful - redirect to login
        router.push('/?reset=true');
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'An error occurred while resetting password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-primary text-transparent bg-clip-text mb-2">
            <Image src="/logo.png" width={150} height={32} alt="Logo" />
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            Enter the verification code and your new password
          </p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Verification Code
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
                        className={`w-10 h-12 flex items-center justify-center border rounded text-xl mx-1 ${slot.isActive ? 'border-primary' : 'border-gray-300'
                          }`}
                      >
                        {slot.char ?? ""}
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
            {errors.code && <p className="text-center text-sm text-red-600">{errors.code}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handlePasswordChange}
                className={cn(
                  "block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                  errors.password ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            <div className="mt-2">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-xl",
                      i < passwordStrength
                        ? i < 2
                          ? "bg-red-500"
                          : i < 3
                            ? "bg-primary"
                            : "bg-green-500"
                        : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Password strength: {" "}
                {passwordStrength === 0
                  ? "Weak"
                  : passwordStrength === 1
                    ? "Fair"
                    : passwordStrength === 2
                      ? "Good"
                      : "Strong"}
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={cn(
                  "block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                )}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
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