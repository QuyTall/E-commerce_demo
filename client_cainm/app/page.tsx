'use client';
import { useEffect, useState } from 'react';
import { client } from '@/lib/api/client';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Đang tải sản phẩm...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 uppercase border-l-4 border-orange-500 pl-3">
        Gợi ý hôm nay
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}