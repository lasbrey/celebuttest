import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CELEBUT',
  description: 'Celebut - Celebrate your special moments with friends and family'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f2f4f7]`}>
        <AuthProvider>
          {children}
           <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}