'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Create a client
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: (failureCount, error: any) => {
          // Don't retry on 401/403 errors
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            return false;
          }
          return failureCount < 3;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f2f4f7]`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}