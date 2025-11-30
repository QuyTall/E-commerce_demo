import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  // Format tiền tệ VND
  const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

  return (
    <Link href={`/products/${product.id}`} className="group bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full aspect-square bg-slate-100">
        <Image 
          src={product.image || '/placeholder.png'} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform" 
        />
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium h-10 mb-2 group-hover:text-orange-600">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-orange-600 font-bold">{price}</span>
          <span className="text-xs text-slate-500">Đã bán 10+</span>
        </div>
      </div>
    </Link>
  );
}