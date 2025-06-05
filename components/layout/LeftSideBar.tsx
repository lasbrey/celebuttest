'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  MessageCircle,
  Users,
  Wallet,
  Star,
  Radio,
  Bell,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LeftSideBar = () => {
  const pathname = usePathname();

  const activeColor = '#FAB937';

  const menuItems = [
    {
      name: 'Celebrations',
      href: '/celebrations',
      icon: (isActive: boolean) => (
        <Image
          src="/icons/celebration.svg"
          alt="Celebration"
          width={26}
          height={26}
          style={{
            filter: isActive
              ? 'invert(76%) sepia(85%) saturate(580%) hue-rotate(358deg) brightness(103%) contrast(101%)'
              : 'none',
          }}
        />
      ),
    },
    {
      name: 'Timeline',
      href: '/feed',
      icon: (isActive: boolean) => (
        <Image
          src="/icons/feed.svg"
          alt="Feed"
          width={26}
          height={26}
          style={{
            filter: isActive
              ? 'invert(76%) sepia(85%) saturate(580%) hue-rotate(358deg) brightness(103%) contrast(101%)'
              : 'none',
          }}
        />
      ),
    },
    { name: 'Friends', href: '/friends', icon: Users },
    { name: 'Celevision', href: '/celevision', icon: Radio },
    { name: 'Communicators', href: '/communicator', icon: MessageCircle },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const businessItems = [
    { name: 'Facebook', href: '#', icon: Star },
    { name: 'Twitter', href: '#', icon: Star },
    { name: 'Instagram', href: '#', icon: Star },
  ];

  return (
    <aside className="flex flex-col pt-5 h-full bg-white rounded-2xl">
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col p-4">
          <Link href="/profile" className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
              alt="Lazarus Lawal"
              className="h-10 w-10 rounded-md"
            />
            <div>
              <h4 className="font-medium">Lazarus Lawal</h4>
            </div>
          </Link>
        </div>

        <div className="p-4 my-2">
          <nav className="space-y-2 mb-5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const color = isActive ? activeColor : '#000';

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100 ${
                    isActive ? 'bg-primary/20 font-semibold' : ''
                  }`}
                >
                  <span className="py-2 rounded-lg">
                    {typeof item.icon === 'function' ? (
                      item.icon(isActive)
                    ) : (
                      <item.icon className="h-6 w-6" color={color} />
                    )}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <h2 className="mt-4 font-semibold">Business You Like</h2>
          <nav className="space-y-2 flex-grow">
            {businessItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100"
              >
                <span className="py-2 rounded-lg">
                  <item.icon className="h-5 w-5 text-gray-600" />
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <h2 className="mt-4 font-semibold cursor-pointer hover:bg-gray-100 p-3 rounded-lg">
              See More
            </h2>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;