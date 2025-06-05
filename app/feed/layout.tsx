'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import LeftSideBar from '@/components/layout/LeftSideBar';
import RightSideBar from '@/components/layout/RightSideBar';
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen  ">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                    <div className="h-full overflow-y-auto py-6">
                        <LeftSideBar />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex flex-1 overflow-hidden px-2 md:px-5 lg:max-w-7xl lg:mx-auto pt-5">
                <div className="hidden md:block w-64 overflow-y-auto h-full">
                    <LeftSideBar />
                </div>

                <main className="flex-1 overflow-y-auto h-full lg:max-w-3xl lg:mx-auto">
                    <div className=" px-4">
                        {children}
                    </div>
                </main>

                <div className="hidden md:block w-72 lg:w-80 overflow-y-auto h-full">
                    <RightSideBar />
                </div>
            </div>
        </div>
    );
}