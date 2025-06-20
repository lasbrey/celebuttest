"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, Calendar, Building, Phone, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserSignupPayload, BusinessSignupPayload } from "@/types/auth";

import {
  COUNTRY_CODES,
  getIndustriesFromApi,
  validateEmail,
  validatePassword,
  validateUsername,
  formatPhoneNumber,
  formatDateForAPI,
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/api/apiClient";

export default function SignUpPage() {
  const router = useRouter();
  const [industries, setIndustries] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

  useEffect(() => {
    async function loadIndustries() {
      const data = await getIndustriesFromApi();
      setIndustries(data);
    }
    loadIndustries();
  }, []);

  // Form data
  const [userFormData, setUserFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    date_of_birth: '',
    password: '',
    phone_number: '',
  });

  const [businessFormData, setBusinessFormData] = useState({
    business_name: '',
    username: '',
    email: '',
    password: '',
    phone_number: '',
    industry: 'entertainment',
  });

  const checkPasswordStrength = (password: string) => {
    const validation = validatePassword(password);
    setPasswordStrength(validation.strength);

    if (password && !validation.isValid) {
      setErrors(prev => ({ ...prev, password: validation.errors[0] }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        if (value && !validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'username':
        if (value) {
          const validation = validateUsername(value);
          if (!validation.isValid) {
            error = validation.errors[0];
          }
        }
        break;
      case 'phone_number':
        if (value && value.replace(/\D/g, '').length < 10) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'full_name':
      case 'business_name':
        if (value && value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleBusinessInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate all fields
      const requiredFields = ['full_name', 'username', 'email', 'date_of_birth', 'password', 'phone_number'];
      const newErrors: Record<string, string> = {};

      requiredFields.forEach(field => {
        if (!userFormData[field as keyof typeof userFormData]) {
          newErrors[field] = 'This field is required';
        }
      });

      // Additional validations
      if (userFormData.email && !validateEmail(userFormData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (userFormData.username && !validateUsername(userFormData.username).isValid) {
        newErrors.username = validateUsername(userFormData.username).errors[0];
      }

      if (userFormData.password && !validatePassword(userFormData.password).isValid) {
        newErrors.password = validatePassword(userFormData.password).errors[0];
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const { isValid, formattedNumber, error } = formatPhoneNumber(selectedCountryCode, userFormData.phone_number);

      if (!isValid) {
        console.error(error);
        return;
      }
      const payload: UserSignupPayload = {
        country_code: selectedCountryCode,
        date_of_birth: formatDateForAPI(userFormData.date_of_birth),
        email: userFormData.email,
        full_name: userFormData.full_name,
        password: userFormData.password,
        phone_number: formattedNumber || "",
        username: userFormData.username,
      };

      const response = await authApi.signupUser(payload);

      if (!response || response.error) {
        setErrors({ general: response?.message || response?.error || 'Signup failed' });
      } else {
        router.push('/auth/verify?email=' + encodeURIComponent(userFormData.email));
      }

    } catch (error: any) {
      setErrors({ general: error.message || 'An error occurred during signup' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate all fields
      const requiredFields = ['business_name', 'username', 'email', 'password', 'phone_number'];
      const newErrors: Record<string, string> = {};

      requiredFields.forEach(field => {
        if (!businessFormData[field as keyof typeof businessFormData]) {
          newErrors[field] = 'This field is required';
        }
      });

      // Additional validations
      if (businessFormData.email && !validateEmail(businessFormData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (businessFormData.username && !validateUsername(businessFormData.username).isValid) {
        newErrors.username = validateUsername(businessFormData.username).errors[0];
      }

      if (businessFormData.password && !validatePassword(businessFormData.password).isValid) {
        newErrors.password = validatePassword(businessFormData.password).errors[0];
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }
      const { isValid, formattedNumber, error } = formatPhoneNumber(selectedCountryCode, businessFormData.phone_number);

      if (!isValid) {
        console.error(error);
        return;
      }
      const payload: BusinessSignupPayload = {
        business_name: businessFormData.business_name,
        country_code: selectedCountryCode,
        email: businessFormData.email,
        industry: businessFormData.industry,
        password: businessFormData.password,
        phone_number: formattedNumber || "",
        username: businessFormData.username,
      };

      const response = await authApi.signupBusiness(payload);

      if (!response || response.error) {
        setErrors({ general: response?.message || response?.error || 'Signup failed' });
      } else {
        router.push('/auth/verify?email=' + encodeURIComponent(businessFormData.email));
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'An error occurred during signup' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 pt-10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center flex items-center flex-col">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-500 text-transparent bg-clip-text mb-2">
            <Image src="/logo.png" width={150} height={32} alt="Logo" />
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900">Sign Up</h2>
          <p className="mt-2 text-gray-600">Celebrate your friends and loved ones</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="user">Personal Account</TabsTrigger>
            <TabsTrigger value="business">Business Account</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-8">
            <form onSubmit={handleUserSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      required
                      value={userFormData.full_name}
                      onChange={handleUserInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.full_name ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Name"
                    />
                  </div>
                  {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={userFormData.username}
                      onChange={handleUserInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.username ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Username"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

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
                      value={userFormData.email}
                      onChange={handleUserInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.email ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Email address"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
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
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        required
                        value={userFormData.phone_number}
                        onChange={handleUserInputChange}
                        className={cn(
                          "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                          errors.phone_number ? "border-red-300" : "border-gray-300"
                        )}
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>
                  {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      required
                      value={userFormData.date_of_birth}
                      onChange={handleUserInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.date_of_birth ? "border-red-300" : "border-gray-300"
                      )}
                    />
                  </div>
                  {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
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
                      value={userFormData.password}
                      onChange={handleUserInputChange}
                      className={cn(
                        "block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-primary focus:border-primary",
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Personal Account'
                  )}
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="business" className="mt-8">
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="business_name"
                      name="business_name"
                      type="text"
                      required
                      value={businessFormData.business_name}
                      onChange={handleBusinessInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.business_name ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Business Name"
                    />
                  </div>
                  {errors.business_name && <p className="mt-1 text-sm text-red-600">{errors.business_name}</p>}
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={businessFormData.username}
                      onChange={handleBusinessInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.username ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Username"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Business Email
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
                      value={businessFormData.email}
                      onChange={handleBusinessInputChange}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                        errors.email ? "border-red-300" : "border-gray-300"
                      )}
                      placeholder="Enter Business Email"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                    Business Phone
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
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        required
                        value={businessFormData.phone_number}
                        onChange={handleBusinessInputChange}
                        className={cn(
                          "block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary focus:border-primary",
                          errors.phone_number ? "border-red-300" : "border-gray-300"
                        )}
                        placeholder="Enter Business Phone"
                      />
                    </div>
                  </div>
                  {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <Select
                    value={businessFormData.industry}
                    onValueChange={(value) => setBusinessFormData(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry.charAt(0).toUpperCase() + industry.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      value={businessFormData.password}
                      onChange={handleBusinessInputChange}
                      className={cn(
                        "block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-primary focus:border-primary",
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Business Account'
                  )}
                </button>
              </div>
            </form>
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
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
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