import React from 'react';
import Link from 'next/link';
import { MessageCircle, Search, Settings, Bell } from "lucide-react";
import Image from 'next/image';

const Header = () => {
    return (
        <header className="bg-white border-b p-3 shadow-md px-10">
            <div className="flex items-center justify-between">
                <div className='flex'>
                    <div className="flex items-center space-x-2 sm:w-80">
                        <Link href="/">
                            <Image src="/logo.png" width={150} height={32} alt="Logo" />
                        </Link>
                    </div>

                    <div className="relative w-96">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-1">
                    <Link href="/notifications" className="p-2 hover:bg-gray-100 rounded-xl flex items-center space-x-3">
                        <span className="bg-gray-100 p-2 rounded-lg">
                            <Bell className="h-6 w-6 text-gray-600" />
                        </span>
                    </Link>
                    <Link href="/communicator" className="p-2 hover:bg-gray-100 rounded-xl flex items-center space-x-3">
                        <span className="bg-gray-100 p-2 rounded-lg">
                            <MessageCircle className="h-6 w-6 text-gray-600" />
                        </span>
                    </Link>
                    <Link href="/settings" className="p-2 hover:bg-gray-100 rounded-xl flex items-center space-x-3">
                        <span className="bg-gray-100 p-2 rounded-lg">
                            <Settings className="h-6 w-6 text-gray-600" />
                        </span>
                    </Link>

                    <Link href="/profile" className="flex items-center space-x-3">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            alt="Julia Smith"
                            className="h-10 w-10 rounded-xl"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;