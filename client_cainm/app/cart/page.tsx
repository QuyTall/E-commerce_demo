'use client';
import { useEffect, useState } from 'react';
import { client } from '@/lib/api/client';
import { CartResponse } from '@/lib/types';
import { useAuthStore } from '@/lib/store/auth.store';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CartPage() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const { user } = useAuthStore();

  const fetchCart = () => {
    client.get('/cart').then(res => {
        // Backend trả về ApiResponse<CartResponse> -> lấy result
        setCart(res.data.result || res.data);
    });
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const clearCart = async () => {
    await client.post('/cart/clear');
    fetchCart();
    toast.success('Đã xoá giỏ hàng');
  }

  if (!user) return <div className="p-10 text-center">Vui lòng đăng nhập</div>;
  if (!cart?.items?.length) return <div className="p-10 text-center">Giỏ hàng trống</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ Hàng</h1>
      <div className="bg-white rounded shadow border p-4">
        {cart.items.map(item => (
          <div key={item.productId} className="flex justify-between items-center border-b py-4 last:border-0">
            <div>
              <h3 className="font-medium">{item.productName}</h3>
              <p className="text-sm text-slate-500">Số lượng: {item.quantity}</p>
            </div>
            <div className="font-bold text-orange-600">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <button onClick={clearCart} className="text-red-500 hover:underline">Xoá tất cả</button>
          <div className="text-right">
            <p className="text-xl font-bold mb-4">Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.total)}</p>
            <Link href="/checkout" className="bg-orange-600 text-white px-8 py-3 rounded font-bold hover:bg-orange-700">
              Thanh Toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}