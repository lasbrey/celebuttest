'use client';

import { useState } from 'react';
import LeftSideBar from '@/components/layout/LeftSideBar';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <div className="h-full overflow-y-auto py-6">
              <LeftSideBar />
            </div>
          </SheetContent>
        </Sheet>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr_] h-full max-w-[1440px] w-full mx-auto">
          
          {/* Left Sidebar */}
          <aside className="hidden md:block bg-white h-full overflow-y-auto border-r border-gray-100">
            <LeftSideBar />
          </aside>

          {/* Main Content */}
          <main className="h-full overflow-y-auto">
            {children}
          </main>

        </div>
      </div>
    </ProtectedRoute>
  );
}
