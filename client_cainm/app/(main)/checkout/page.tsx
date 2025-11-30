'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { client } from '@/lib/api/client';
import { useAuthStore } from '@/lib/store/auth.store';
import { CartResponse } from '@/lib/types';
import { MapPin, CreditCard, Truck } from 'lucide-react';

// Icons ngân hàng giả lập
const PaymentMethods = [
    { id: 'COD', name: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
    { id: 'BANK', name: 'Chuyển khoản ngân hàng', icon: '🏦' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { fullName: user?.username || '', phone: '', address: '' }
  });

  useEffect(() => {
    if(user) client.get('/cart').then(res => setCart(res.data.result || res.data));
  }, [user]);

  const onSubmit = async (data: any) => {
    if (!cart) return;
    try {
      const orderPayload = {
        customerName: data.fullName,
        phone: data.phone,
        address: data.address,
        totalAmount: cart.total,
        status: "PENDING",
        items: cart.items.map(item => ({
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          image: "https://via.placeholder.com/150" 
        }))
      };

      await client.post('/orders', orderPayload);
      await client.post('/cart/clear');
      
      toast.success('Đặt hàng thành công! Mã đơn: #' + Math.floor(Math.random() * 10000));
      router.push('/profile/orders');
    } catch (error) {
      toast.error('Lỗi đặt hàng');
    }
  };

  if (!cart) return <div className="p-10 text-center">Đang tải thông tin thanh toán...</div>;

  return (
    <div className="bg-slate-100 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-5xl">
            {/* Header Checkout */}
            <div className="bg-white p-4 border-b-4 border-t-4 border-t-transparent border-b-orange-500 shadow-sm mb-4 flex items-center gap-4">
                <div className="text-2xl text-orange-600 font-bold flex items-center gap-2">
                    <CreditCard /> Thanh Toán
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Cột Trái: Địa Chỉ & Sản Phẩm */}
                <div className="lg:col-span-8 space-y-4">
                    {/* Địa chỉ nhận hàng */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <div className="text-orange-600 flex items-center gap-2 text-lg font-bold mb-4">
                            <MapPin /> Địa Chỉ Nhận Hàng
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input {...register('fullName')} placeholder="Họ và Tên" className="border p-2 rounded focus:border-orange-500 outline-none" required />
                            <input {...register('phone')} placeholder="Số điện thoại" className="border p-2 rounded focus:border-orange-500 outline-none" required />
                            <input {...register('address')} placeholder="Địa chỉ cụ thể (Số nhà, Phường, Quận...)" className="md:col-span-2 border p-2 rounded focus:border-orange-500 outline-none" required />
                        </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="font-bold mb-4">Sản phẩm</h3>
                        <div className="space-y-4">
                            {cart.items.map(item => (
                                <div key={item.productId} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded overflow-hidden">
                                             {/* Ảnh placeholder */}
                                             <img src="https://via.placeholder.com/100" alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-sm text-slate-500">x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="font-medium">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 bg-slate-50 p-4 rounded border border-dashed border-slate-300">
                             <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                <Truck className="w-4 h-4" /> Đơn vị vận chuyển: Nhanh
                             </div>
                             <span className="text-sm text-slate-500">Nhận hàng vào 3-5 ngày tới</span>
                        </div>
                    </div>
                </div>

                {/* Cột Phải: Thanh toán */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white p-6 rounded shadow-sm sticky top-4">
                        <h3 className="font-bold mb-4">Phương thức thanh toán</h3>
                        <div className="space-y-2 mb-6">
                            {PaymentMethods.map(method => (
                                <div 
                                    key={method.id} 
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition ${paymentMethod === method.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'hover:bg-slate-50'}`}
                                >
                                    <span className="text-xl">{method.icon}</span>
                                    <span className="text-sm font-medium">{method.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <span>Tổng tiền hàng</span>
                                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.total)}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Phí vận chuyển</span>
                                <span>0 ₫</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-orange-600 pt-2 border-t mt-2">
                                <span>Tổng thanh toán</span>
                                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.total)}</span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-orange-600 text-white py-3 mt-6 rounded font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'ĐẶT HÀNG'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}