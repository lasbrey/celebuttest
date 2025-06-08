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
  LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getUserDisplayName, getUserAvatar } from '@/lib/auth';

// Types
type IconType = LucideIcon | ((isActive: boolean) => ReactNode);

interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
}

interface BusinessItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// Component
const LeftSideBar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const activeColor = '#FAB937';

  const menuItems: MenuItem[] = [
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

  const businessItems: BusinessItem[] = [
    { name: 'Facebook', href: '#', icon: Star },
    { name: 'Twitter', href: '#', icon: Star },
    { name: 'Instagram', href: '#', icon: Star },
  ];

  if (!user) {
    return (
      <aside className="flex flex-col pt-5 h-full bg-white rounded-2xl w-full max-w-[260px]">
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col pt-5 h-full bg-white rounded-2xl w-full max-w-[260px]">
      <div className="flex flex-col flex-grow">
        {/* Profile Header */}
        <div className="flex flex-col p-4">
          <Link href="/profile" className="flex items-center space-x-3">
            <img
              src={getUserAvatar(user)}
              alt={getUserDisplayName(user)}
              className="h-10 w-10 rounded-md object-cover"
            />
            <div>
              <h4 className="font-medium">{getUserDisplayName(user)}</h4>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </Link>
        </div>

        {/* Menu Section */}
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
                    isActive ? 'bg-yellow-100 font-semibold' : ''
                  }`}
                >
                  <span className="py-2 rounded-lg">
                    {typeof item.icon === 'function'
                      ? item.icon(isActive)
                      : React.createElement(item.icon, { className: 'h-6 w-6', color })}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Business Section */}
          <h2 className="mt-4 font-semibold text-sm text-gray-500">Business You Like</h2>
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

            {/* See More */}
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