"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const settingsItems = [
    { title: "Content Settings", link: "/settings/content" },
    { title: "Banned Words", link: "/settings/banned-words" },
    { title: "Blocked Accounts", link: "/settings/blocked-users" }
];

export default function SettingsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center space-x-3 mb-6">
                    <Link href="/settings" className="text-gray-600">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-semibold">Privacy & Safety</h1>
                </div>

                <div className="space-y-4">
                    {settingsItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50"
                        >
                            <span className="font-medium">{item.title}</span>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                    ))}

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button
                                onClick={() => setOpen(true)}
                                className="w-full p-4 text-left text-red-600 bg-white rounded-lg hover:bg-gray-50"
                            >
                                Deactivate Account
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Deactivate Account</DialogTitle>
                            </DialogHeader>
                            <p className="text-gray-600">
                                Are you sure you want to deactivate your account? 
                            
                            </p>
                            <DialogFooter className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => {
                                    setOpen(false);
                                }}>
                                    Deactivate
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
