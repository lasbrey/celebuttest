"use client";

import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/settings" className="text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Change Password</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 mb-6">
            Feeling worried about your account been easily preyed on?
            <br />Then change that password now!
          </p>

          <form className="space-y-6">
            <div>
              <Label>Previous Password</Label>
              <Input type="password" className="mt-1" />
            </div>

            <div>
              <Label>New Password</Label>
              <Input type="password" className="mt-1" />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" className="mt-1" />
            </div>

            <div>
              <Label>Two-Factor Authentication</Label>
              <Input type="text" className="mt-1" />
            </div>

            <button className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}