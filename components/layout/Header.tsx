import React from 'react';
import Link from 'next/link';
import { MessageCircle, Search, Settings, Bell, Menu } from "lucide-react";
import Image from 'next/image';

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
    return (
        <header className="bg-white border-b h-14 px-4 sticky top-0 z-50">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
                <div className='flex items-center space-x-4'>
                    <button 
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
                    >
                        <Menu className="h-5 w-5 text-gray-600" />
                    </button>
                    <Link href="/feed">
                        <Image src="/logo.png" width={120} height={28} alt="Logo" />
                    </Link>
                </div>

                <div className="hidden md:block relative w-96">
                    <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-1.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                </div>

                <div className="flex items-center space-x-1">
                    <Link href="/notifications" className="p-2 hover:bg-gray-100 rounded-xl">
                        <Bell className="h-5 w-5 text-gray-600" />
                    </Link>
                    <Link href="/communicator" className="p-2 hover:bg-gray-100 rounded-xl">
                        <MessageCircle className="h-5 w-5 text-gray-600" />
                    </Link>
                    <Link href="/settings" className="p-2 hover:bg-gray-100 rounded-xl">
                        <Settings className="h-5 w-5 text-gray-600" />
                    </Link>
                    <Link href="/profile" className="ml-1">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            alt="Profile"
                            className="h-8 w-8 rounded-xl"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;