"use client";

import { ArrowLeftRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SendMoneyPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="p-8">

          <div className="grid grid-cols-3 gap-6">
            {/* Send Money Form */}
            <div className="col-span-2 bg-white rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-6">Send Money</h2>
              
              <form className="space-y-6">
                <div>
                  <Label>Receiver's Name</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Ahmed Thompson" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmed">Ahmed Thompson</SelectItem>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                      <SelectItem value="michael">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0.00" className="mt-1" />
                </div>

                <button className="w-full bg-amber-400 text-white py-3 rounded-lg hover:bg-amber-500 flex items-center justify-center space-x-2">
                  <span>Continue</span>
                  <ArrowLeftRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}