'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

// Import các component vừa tạo
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { client } from '@/lib/api/client'; // Đảm bảo file này đã có như hướng dẫn trước

// Schema validation
const registerSchema = z.object({
  username: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu nhập lại không khớp",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      // Gọi API đăng ký về Backend Spring Boot
      await client.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        role: "USER" // Backend cần Role, mặc định là USER
      });
      
      toast.success('Đăng ký thành công! Đang chuyển hướng...');
      
      // Chờ 1.5s rồi chuyển sang trang login
      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (error: any) {
      console.error("Lỗi đăng ký:", error);
      // Lấy thông báo lỗi từ Backend nếu có
      const msg = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Tạo Tài Khoản Mới</h1>
          <p className="text-sm text-slate-500 mt-2">Tham gia mua sắm cùng Cainm Store</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input 
              id="username" 
              {...register('username')} 
              placeholder="Ví dụ: user123" 
              className={errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.username && <p className="text-red-500 text-xs font-medium">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              {...register('email')} 
              placeholder="user@example.com" 
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input 
              id="password" 
              type="password" 
              {...register('password')} 
              placeholder="••••••" 
              className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              {...register('confirmPassword')} 
              placeholder="••••••" 
              className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs font-medium">{errors.confirmPassword.message}</p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng Ký Ngay'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-orange-600 hover:underline font-semibold transition-colors">
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}