import React from 'react';
import { MessageCircle, Users, Wallet, Star, Radio, HomeIcon } from "lucide-react";
import Link from 'next/link';

const LeftSideBar = () => {
    const menuItems = [
        { name: "Timeline", href: "/", icon: HomeIcon },
        { name: "Friends", href: "/friends", icon: Users },
        { name: "Celebrations", href: "/celebrations", icon: Star },
        { name: "Celevision", href: "/celevision", icon: Radio },
        { name: "Communicators", href: "/communicator", icon: MessageCircle },
        { name: "Wallet", href: "/wallet", icon: Wallet },
    ];

    const businessItems = [
        { name: "Facebook", href: "#", icon: Star },
        { name: "Twitter", href: "#", icon: Star },
        { name: "Instagram", href: "#", icon: Star },
    ];

    return (
        <aside className="flex flex-col pt-5">
            <div className='flex flex-col flex-grow'>
                <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
                    <Link href="profile" className="flex items-center space-x-3">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                            alt="Lazarus Lawal"
                            className="h-10 w-10 rounded-md"
                        />
                        <div>
                            <h4 className="font-medium">Lazarus Lawal</h4>
                            <span className="text-gray-500">@johndoe</span>
                        </div>


                    </Link>
                </div>

                <div className='bg-white p-4 rounded-lg shadow-md my-2'>
                    <nav className="space-y-2 mb-5 ">
                        {menuItems.map((item) => (
                            <a key={item.name} href={item.href} className="flex items-center space-x-3 py-3 rounded-lg hover:bg-gray-100">
                                <span className="bg-gray-100 p-2 rounded-lg">
                                    <item.icon className="h-5 w-5 text-gray-600" />
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </a>
                        ))}
                    </nav>

                    <h2 className="mt-4 font-semibold">Business You Like</h2>
                    <nav className="space-y-2 flex-grow">
                        {businessItems.map((item) => (
                            <a key={item.name} href={item.href} className="flex items-center space-x-3 py-3 rounded-lg hover:bg-gray-100">
                                <span className="bg-gray-100 p-2 rounded-lg">
                                    <item.icon className="h-5 w-5 text-gray-600" />
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </a>
                        ))}
                        <h2 className="mt-4 font-semibold cursor-pointer hover:bg-gray-100 p-3 rounded-lg">See More</h2>
                    </nav>
                </div>
            </div>
        </aside>
    );
}

export default LeftSideBar;