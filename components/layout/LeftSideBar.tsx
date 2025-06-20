'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  MessageCircle,
  Users,
  Wallet,
  Star,
  Radio,
  Bell,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { getUserDisplayName, getUserAvatar } from '@/lib/auth';
import CelebrationIcon from '@/components/icons/celebration';
import FeedIcon from '@/components/icons/feed';

// Types
type IconType = LucideIcon | ((isActive: boolean) => ReactNode);

interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
  badge?: number;
}

const LeftSideBar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const activeColor = '#e7bd4b';

  const menuItems: MenuItem[] = [
     {
      name: 'Celebrations',
      href: '/celebrations',
      icon: (isActive: boolean) => (
        <CelebrationIcon
          width={24}
          height={24}
          style={{ fill: isActive ? activeColor : 'currentColor' }}
        />
      ),
    },
    {
      name: 'Timeline',
      href: '/feed',
      icon: (isActive: boolean) => (
        <FeedIcon
          width={24}
          height={24}
          style={{ fill: isActive ? activeColor : 'currentColor' }}
        />
      ),
      badge: 10,
    },
    {
      name: 'Friends',
      href: '/friends',
      icon: Users,
      badge: 2,
    },
    { name: 'Celevision', href: '/celevision', icon: Radio },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help & Support', href: '/support', icon: MessageCircle },
  ];

  if (!user) {
    return (
      <aside className="flex flex-col pt-5 h-full bg-white w-full max-w-[260px]">
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col h-full w-full px-4 py-6">
      {/* Logo */}
      <div className="mb-6 px-2">
        <Link href="/" className="text-2xl font-bold text-primary">
          <Image
            src="/logo.png"
            alt="Celebut Logo"
            width={120}
            height={40}
            priority
          />
        </Link>
      </div>

         {/* Menu Section */}
        <div className="">
          <nav className="space-y-2 mb-5">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const color = isActive ? activeColor : '#000';

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-[#e7bd4b] font-bold' : ''
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
        </div>

      {/* User Info */}
      <div className="mt-auto border-t pt-4">
        <Link href="/profile" className="flex items-center gap-3">
          <img
            src={getUserAvatar(user)}
            alt={getUserDisplayName(user)}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div>
            <h4 className="font-semibold capitalize">{getUserDisplayName(user)}</h4>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default LeftSideBar;

