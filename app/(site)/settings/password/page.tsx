'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { settingsApi } from '@/services/api/apiClient';

export default function ChangePasswordPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all password fields.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'New password and confirmation do not match.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await settingsApi.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });

      toast({
        title: 'Password Changed',
        description: 'Your password has been updated successfully.',
      });

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to update password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/settings" className="text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Change Password</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 mb-6">
            Feeling worried about your account being easily preyed on?
            <br />
            Then change that password now!
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="old-password">Previous Password</Label>
              <Input
                id="old-password"
                type="password"
                className="mt-1"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mt-1 relative">
              <Label htmlFor="confirm-password">New Password</Label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                className="mt-1"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 top-1/2 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="mt-1 relative">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                className="mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 top-1/2 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}