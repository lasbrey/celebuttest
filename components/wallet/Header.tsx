import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="bg-white border-b px-8 py-4">
            <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary mr-10 cursor-pointer">
                    <Image src="/logo.png" width={150} height={32} alt="Logo" />
                </Link>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                        <TabsTrigger value="transactions" className="text-sm">Transactions</TabsTrigger>
                        <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
                        <TabsTrigger value="accounts" className="text-sm">Accounts</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                        <Settings className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                        <Bell className="h-5 w-5 text-gray-600" />
                    </button>
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&q=80"
                        alt="Profile"
                        className="w-8 h-8 rounded-md"
                    />
                </div>
            </div>
        </header>
    )
}

export default Header