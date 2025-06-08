"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Smartphone, ArrowLeft, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiClient, LoginPayload } from "@/lib/api";
import { validateEmail, generateFCMToken } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/useAuth';


export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [qrExpiry, setQrExpiry] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form
      const newErrors: Record<string, string> = {};

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const payload: LoginPayload = {
        email: formData.email,
        password: formData.password,
        fcm_token: generateFCMToken(),
      };

      const response = await apiClient.login(payload);

      if (response.error) {
        setErrors({ general: response.message || response.error });
      } else {
        // Set user data in auth context
        if (response.data?.user) {
          login(response.data.user);
        }
        router.push('/celebrations');
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'An error occurred during sign in' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center flex items-center flex-col">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-500 text-transparent bg-clip-text mb-2">
            <Image src="/logo.png" width={150} height={32} alt="Logo" />
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back!</h2>
          <p className="mt-2 text-gray-600">Sign in to continue celebrating with your friends</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="credentials">Email & Password</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="credentials" className="mt-8">
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500",
                        errors.email ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Email address"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
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
                      value={formData.password}
                      onChange={handleInputChange}
                      className={cn(
                        "block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500",
                        errors.password ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="••••••••••••••••"
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
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </TabsContent>

          <TabsContent value="qr" className="mt-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=celebut-auth-demo"
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-1 rounded-full text-sm">
                    {Math.floor(qrExpiry / 60)}:{(qrExpiry % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  1. Open CELEBUT app on your phone
                </p>
                <p className="text-gray-600">
                  2. Tap <Smartphone className="h-4 w-4 inline mb-1" /> Profile Scan QR Code
                </p>
                <p className="text-gray-600">
                  3. Point your camera at this screen
                </p>
              </div>

              <button
                onClick={() => setQrExpiry(300)}
                className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Refresh QR Code
              </button>
            </div>
          </TabsContent>
        </Tabs>

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
              href="/auth/sign-up"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Create new account
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <p>Copyright 2025 CELEBUT ©</p>
          <div className="space-x-4">
            <Link href="/privacy" className="text-yellow-600 hover:text-yellow-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-yellow-600 hover:text-yellow-500">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}