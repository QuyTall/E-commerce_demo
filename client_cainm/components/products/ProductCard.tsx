import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Giả lập giá gốc để tạo cảm giác khuyến mãi
  const fakeOriginalPrice = product.price * 1.2; 

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group relative bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* 1. PHẦN ẢNH SẢN PHẨM - Quan trọng: aspect-square giúp ảnh luôn vuông */}
      <div className="relative w-full aspect-square bg-slate-50 overflow-hidden">
        <Image
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge giảm giá */}
        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md">
          -20%
        </div>

        {/* Overlay nút chức năng khi hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
           <button className="bg-white text-slate-800 p-2 rounded-full hover:bg-orange-600 hover:text-white transition shadow-lg" title="Xem nhanh">
              <Eye className="w-5 h-5" />
           </button>
           <button className="bg-white text-slate-800 p-2 rounded-full hover:bg-orange-600 hover:text-white transition shadow-lg" title="Thêm vào giỏ">
              <ShoppingCart className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* 2. PHẦN THÔNG TIN */}
      <div className="p-3 flex flex-col flex-1">
        {/* Tên sản phẩm: Giới hạn 2 dòng để đều nhau */}
        <h3 className="text-sm font-medium text-slate-700 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors min-h-[40px]">
          {product.name}
        </h3>

        {/* Đánh giá & Đã bán */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
           <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
           </div>
           <span>Đã bán 1.2k</span>
        </div>

        {/* Giá tiền */}
        <div className="mt-auto pt-2 border-t border-dashed border-slate-100 flex items-baseline gap-2">
          <span className="text-base font-bold text-orange-600">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-slate-400 line-through">
            {formatCurrency(fakeOriginalPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
}