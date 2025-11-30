import type { Metadata } from 'next';
import { Montserrat, Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

// Font tiêu đề (Sang trọng)
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-title',
  weight: ['400', '500', '600', '700', '800'] 
});

// Font nội dung (Dễ đọc)
const nunito = Nunito({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '500', '600', '700'] 
});

export const metadata: Metadata = {
  title: 'Cainm Store - Mua Sắm Đẳng Cấp',
  description: 'Trải nghiệm mua sắm thời thượng',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${montserrat.variable} ${nunito.variable} font-body bg-slate-50 text-slate-800 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 pt-4 pb-12">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}