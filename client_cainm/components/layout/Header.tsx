'use client';

import Link from 'next/link';
import { ShoppingCart, Search, User, Phone, Mail, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth.store';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-100 text-xs text-slate-500 py-1 border-b">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 1900 1234</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> support@cainm.com</span>
          </div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-primary">Về chúng tôi</Link>
            <Link href="/contact" className="hover:text-primary">Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary text-white p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">CAINM<span className="text-slate-800">STORE</span></span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm, thương hiệu..." 
              className="w-full pl-4 pr-12 py-2.5 border-2 border-primary rounded-lg focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md hover:bg-primary-hover transition">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Cart */}
            <Link href="/cart" className="relative group">
              <div className="p-2 rounded-full hover:bg-slate-100 transition">
                <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-primary" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">3</span>
              </div>
            </Link>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                   <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                   </div>
                   <span className="hidden lg:block">{user.username}</span>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 hidden group-hover:block animate-fade-in">
                   <Link href="/profile/orders" className="block px-4 py-2 hover:bg-slate-50 text-sm">Đơn mua</Link>
                   <Link href="/profile" className="block px-4 py-2 hover:bg-slate-50 text-sm">Hồ sơ</Link>
                   <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Đăng xuất
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm font-medium">
                <Link href="/login" className="hover:text-primary">Đăng nhập</Link>
                <span className="h-4 w-[1px] bg-slate-300"></span>
                <Link href="/register" className="hover:text-primary">Đăng ký</Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="w-full pl-4 pr-10 py-2 border rounded-lg focus:border-primary outline-none text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Navigation Menu (Desktop) */}
      <div className="hidden md:block border-t bg-white">
        <div className="container">
          <nav className="flex gap-8 text-sm font-medium py-3 text-slate-600">
            <Link href="/" className="text-primary hover:text-primary-hover">Trang Chủ</Link>
            <Link href="/products" className="hover:text-primary">Sản Phẩm</Link>
            <Link href="/flash-sale" className="hover:text-primary flex items-center gap-1"><span className="text-yellow-500">⚡</span> Flash Sale</Link>
            <Link href="/about" className="hover:text-primary">Giới Thiệu</Link>
            <Link href="/contact" className="hover:text-primary">Liên Hệ</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}