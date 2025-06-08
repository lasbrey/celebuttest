'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthUser, getCurrentUser, isAuthenticated, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      if (isAuthenticated()) {
        const userData = await getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (userData: AuthUser) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: handleLogout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}