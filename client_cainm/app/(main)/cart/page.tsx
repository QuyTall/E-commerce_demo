'use client';
import { useEffect, useState } from 'react';
import { client } from '@/lib/api/client';
import { CartResponse } from '@/lib/types';
import { useAuthStore } from '@/lib/store/auth.store';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Trash2, Minus, Plus, ShoppingBag, Ticket } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

export default function CartPage() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    setLoading(true);
    client.get('/cart')
        .then(res => {
            const data = res.data.result || res.data;
            setCart(data);
        })
        .catch(() => setCart(null)) // Nếu lỗi (vd 403) thì coi như chưa có giỏ
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) fetchCart();
    else setLoading(false);
  }, [user]);

  const removeItem = async (id: number) => {
      try {
          await client.delete(`/cart/remove/${id}`);
          toast.success("Đã xóa sản phẩm");
          fetchCart(); // Reload
      } catch (e) { toast.error("Lỗi khi xóa"); }
  };

  if (!user) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
            <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-16 h-16 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-slate-500 mb-8">Hãy đăng nhập để xem giỏ hàng và mua sắm nhé!</p>
            <Link href="/login" className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition transform hover:-translate-y-1">
                Đăng Nhập Ngay
            </Link>
        </div>
    );
  }

  if (loading) return <div className="p-20 text-center">Đang tải giỏ hàng...</div>;

  if (!cart || cart.items.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <Image src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png" width={200} height={200} alt="Empty Cart" className="mb-6" />
            <p className="text-slate-500 mb-6">Chưa có sản phẩm nào trong giỏ hàng.</p>
            <Link href="/" className="px-6 py-2 border border-orange-600 text-orange-600 rounded hover:bg-orange-50 font-bold transition">
                QUAY LẠI MUA SẮM
            </Link>
        </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-50">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Giỏ Hàng</h1>
        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-sm font-bold">{cart.items.length} sản phẩm</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DANH SÁCH SẢN PHẨM */}
        <div className="lg:col-span-8 space-y-4">
            {/* Header Table */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-white p-4 rounded-lg shadow-sm text-slate-500 font-bold text-sm">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-center">Thành tiền</div>
            </div>

            {cart.items.map((item) => (
                <div key={item.productId} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:border-orange-200 transition">
                    {/* Info */}
                    <div className="md:col-span-6 flex gap-4 items-center">
                        <div className="w-20 h-20 bg-slate-100 rounded overflow-hidden flex-shrink-0 border">
                            {/* Ảnh placeholder nếu backend chưa có ảnh cart */}
                            <img src="https://via.placeholder.com/150" alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <Link href={`/products/${item.productId}`} className="font-medium text-slate-800 line-clamp-2 hover:text-orange-600 transition mb-1">
                                {item.productName}
                            </Link>
                            <p className="text-xs text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded">Phân loại: Mặc định</p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center text-slate-500 font-medium">
                        {formatCurrency(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-slate-300 rounded">
                            <button className="px-2 py-1 hover:bg-slate-100 text-slate-500"><Minus className="w-3 h-3" /></button>
                            <input type="text" value={item.quantity} readOnly className="w-8 text-center text-sm outline-none font-bold text-slate-700" />
                            <button className="px-2 py-1 hover:bg-slate-100 text-slate-500"><Plus className="w-3 h-3" /></button>
                        </div>
                    </div>

                    {/* Total & Action */}
                    <div className="md:col-span-2 flex flex-col items-end md:items-center justify-center gap-2">
                        <span className="text-orange-600 font-bold">
                            {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-slate-400 hover:text-red-500 text-xs flex items-center gap-1 transition"
                        >
                            <Trash2 className="w-3 h-3" /> Xóa
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* TỔNG TIỀN & THANH TOÁN */}
        <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed">
                    <h3 className="font-bold text-slate-700">Mã giảm giá</h3>
                    <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                        <Ticket className="w-4 h-4" /> Chọn mã
                    </button>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Tạm tính</span>
                        <span className="font-medium">{formatCurrency(cart.total)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Giảm giá</span>
                        <span className="font-medium text-green-600">-0 ₫</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                        <span className="text-base font-bold text-slate-800">Tổng cộng</span>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-orange-600 block">{formatCurrency(cart.total)}</span>
                            <span className="text-xs text-slate-400">(Đã bao gồm VAT)</span>
                        </div>
                    </div>
                </div>

                <Link href="/checkout" className="block w-full bg-orange-600 text-white text-center py-4 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200 uppercase tracking-wide">
                    Tiến Hành Thanh Toán
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}