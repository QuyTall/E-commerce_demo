import { Product } from '@/lib/types';
import ProductCard from '../products/ProductCard';
import { Clock } from 'lucide-react';

export default function FlashSale({ products }: { products: Product[] }) {
  // Lấy 5 sản phẩm đầu làm Flash Sale
  const saleProducts = products.slice(0, 5);

  return (
    <div className="container mx-auto px-4 my-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Flash Sale */}
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-orange-600 uppercase italic">FLASH SALE</h2>
                <div className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded text-sm font-bold">
                    <Clock className="w-4 h-4" /> 02 : 15 : 30
                </div>
            </div>
            <a href="/products" className="text-orange-600 text-sm hover:opacity-80">Xem tất cả &gt;</a>
        </div>

        {/* List sản phẩm sale */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
            {saleProducts.map(p => (
                <div key={p.id} className="relative">
                    <ProductCard product={p} />
                    {/* Thanh progress bar đã bán */}
                    <div className="mt-2 relative w-full h-4 bg-orange-100 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-orange-500" style={{width: `${Math.random() * 80 + 10}%`}}></div>
                        <div className="absolute top-0 w-full text-center text-[10px] text-white font-bold leading-4 uppercase">
                            Đã bán {Math.floor(Math.random() * 50)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}