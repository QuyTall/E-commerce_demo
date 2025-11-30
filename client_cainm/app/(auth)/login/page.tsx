'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

// Import các component UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { client } from '@/lib/api/client';
import { useAuthStore } from '@/lib/store/auth.store';

// 1. Định nghĩa Schema validation
const loginSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type LoginForm = z.infer<typeof loginSchema>;

// 2. Component chính - PHẢI CÓ EXPORT DEFAULT
export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await client.post('/auth/login', data);
      
      // Kiểm tra cấu trúc response từ Backend
      if (res.data && res.data.success) {
        const { token, username, role } = res.data.data;
        
        // Lưu vào store & localStorage
        login(token, { username, role });
        
        toast.success('Đăng nhập thành công!');
        
        // Điều hướng
        if (role === 'ADMIN') {
            // Nếu là Admin, có thể chuyển sang trang quản trị (nếu chung domain)
            // Hoặc về trang chủ nếu Admin dashboard là app riêng
             router.push('/'); 
        } else {
             router.push('/');
        }
      } else {
        toast.error(res.data.message || 'Đăng nhập thất bại');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const msg = error.response?.data?.message || 'Lỗi kết nối server';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Đăng Nhập</h1>
          <p className="text-sm text-slate-500 mt-2">Chào mừng bạn quay trở lại Cainm Store</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập / Email</Label>
            <Input 
              id="username" 
              {...register('username')} 
              placeholder="Nhập username hoặc email" 
              className={errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.username && <p className="text-red-500 text-xs font-medium">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link href="#" className="text-xs text-orange-600 hover:underline">Quên mật khẩu?</Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              {...register('password')} 
              placeholder="••••••" 
              className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password.message}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4 h-11 text-base" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng Nhập'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-orange-600 hover:underline font-semibold transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}