'use client';
import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">
          CAINM STORE
        </Link>

        {/* Menu Phải */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-full">
            <ShoppingCart className="w-6 h-6 text-slate-700" />
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile/orders" className="flex items-center gap-2 text-sm font-medium hover:text-orange-600">
                <UserIcon className="w-5 h-5" />
                <span>{user.username}</span>
              </Link>
              <button onClick={logout} className="text-slate-500 hover:text-red-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/login" className="hover:text-orange-600">Đăng nhập</Link>
              <Link href="/register" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}