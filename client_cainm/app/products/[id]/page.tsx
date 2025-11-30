'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/lib/api/client';
import { Product } from '@/lib/types';
import { useAuthStore } from '@/lib/store/auth.store';
import { toast } from 'sonner';

export default function ProductDetail() {
  const params = useParams();
  const { user } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    client.get(`/products/${params.id}`).then(res => setProduct(res.data));
  }, [params.id]);

  const addToCart = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để mua hàng');
      return;
    }
    try {
      // Backend CartController yêu cầu: productId, quantity
      await client.post('/cart/add-to-cart', { productId: product?.id, quantity: 1 });
      toast.success('Đã thêm vào giỏ hàng');
    } catch (err) {
      toast.error('Lỗi khi thêm giỏ hàng');
    }
  };

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8 bg-white mt-4 rounded shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-slate-100 rounded">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-orange-600 font-bold mb-6">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </p>
          <p className="text-slate-600 mb-8">{product.description}</p>
          <div className="flex gap-4">
            <button onClick={addToCart} className="flex-1 bg-orange-100 text-orange-600 border border-orange-600 py-3 rounded font-bold hover:bg-orange-50">
              Thêm Vào Giỏ
            </button>
            <button className="flex-1 bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700">
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}