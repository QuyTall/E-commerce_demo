import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cainm E-commerce',
  description: 'Project Demo SpringBoot + NextJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        <Header />
        <main>{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}