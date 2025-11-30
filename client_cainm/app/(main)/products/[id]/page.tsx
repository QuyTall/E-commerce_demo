'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { client } from '@/lib/api/client';
import { Product } from '@/lib/types';
import { useAuthStore } from '@/lib/store/auth.store';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingCart, Star, Truck, ShieldCheck, Reply } from 'lucide-react';
import Image from 'next/image';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get(`/products/${params.id}`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error("Không tìm thấy sản phẩm"))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!user) {
        toast.error('Vui lòng đăng nhập');
        return router.push('/login');
    }
    try {
        await client.post('/cart/add-to-cart', { productId: product?.id, quantity });
        toast.success('Đã thêm vào giỏ hàng!');
    } catch (e) { toast.error('Lỗi thêm giỏ hàng'); }
  };

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-orange-500 rounded-full border-t-transparent"></div></div>;
  if (!product) return null;

  return (
    <div className="bg-[#f5f5f5] py-6 min-h-screen">
       <div className="container-custom">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-600 mb-4 flex gap-2">
             <span>Cainm Store</span> <span>&gt;</span> <span>{product.category || 'Sản phẩm'}</span> <span>&gt;</span> <span className="text-slate-900 line-clamp-1">{product.name}</span>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-sm shadow-sm p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
             
             {/* 1. Left: Images Gallery */}
             <div className="md:col-span-5 flex flex-col gap-4">
                 <div className="relative w-full aspect-square rounded overflow-hidden border border-slate-100">
                     <Image src={product.image} alt={product.name} fill className="object-cover" />
                 </div>
                 <div className="grid grid-cols-5 gap-2">
                     {[...Array(5)].map((_, i) => (
                         <div key={i} className="relative aspect-square border cursor-pointer hover:border-orange-500 rounded-sm overflow-hidden">
                             <Image src={product.image} alt="" fill className="object-cover opacity-70 hover:opacity-100 transition" />
                         </div>
                     ))}
                 </div>
             </div>

             {/* 2. Right: Info */}
             <div className="md:col-span-7 flex flex-col gap-6">
                 <h1 className="text-xl font-medium text-slate-800 leading-snug">{product.name}</h1>
                 
                 <div className="flex items-center gap-4 text-sm">
                     <div className="flex items-center text-orange-500 border-b border-orange-500 cursor-pointer pb-0.5">
                         <span className="font-bold underline mr-1">4.9</span>
                         <div className="flex text-xs"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                     </div>
                     <div className="w-[1px] h-4 bg-slate-300"></div>
                     <div className="text-slate-500">1.2k Đánh giá</div>
                     <div className="w-[1px] h-4 bg-slate-300"></div>
                     <div className="text-slate-500">3.5k Đã bán</div>
                 </div>

                 {/* Price Box */}
                 <div className="bg-slate-50 p-4 flex items-center gap-4 rounded-sm">
                     <span className="text-slate-400 line-through text-sm">₫{new Intl.NumberFormat().format(product.price * 1.3)}</span>
                     <span className="text-3xl font-medium text-orange-500">₫{new Intl.NumberFormat().format(product.price)}</span>
                     <span className="bg-orange-500 text-white text-[10px] font-bold px-1 py-0.5 rounded uppercase">20% Giảm</span>
                 </div>

                 {/* Policies */}
                 <div className="grid grid-cols-1 gap-3 text-sm text-slate-600">
                     <div className="flex items-start gap-2">
                         <span className="font-medium text-slate-500 w-24">Vận chuyển</span>
                         <div>
                             <div className="flex items-center gap-1 mb-1"><Truck className="w-4 h-4 text-green-600" /> Miễn phí vận chuyển</div>
                             <div className="text-slate-400 text-xs">Miễn phí vận chuyển cho đơn hàng trên ₫200.000</div>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                         <span className="font-medium text-slate-500 w-24">Chính sách</span>
                         <div className="flex gap-4">
                             <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-orange-500" /> Đổi trả 15 ngày</span>
                             <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-orange-500" /> Hàng chính hãng 100%</span>
                         </div>
                     </div>
                 </div>

                 {/* Quantity */}
                 <div className="flex items-center gap-4 mt-2">
                     <span className="text-slate-500 w-24">Số lượng</span>
                     <div className="flex items-center border border-slate-300 rounded-sm">
                         <button className="px-3 py-1 border-r hover:bg-slate-50" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="w-3 h-3"/></button>
                         <input type="text" value={quantity} readOnly className="w-12 text-center outline-none text-slate-800 font-medium" />
                         <button className="px-3 py-1 border-l hover:bg-slate-50" onClick={() => setQuantity(quantity + 1)}><Plus className="w-3 h-3"/></button>
                     </div>
                     <span className="text-xs text-slate-400">{product.stock || 100} sản phẩm có sẵn</span>
                 </div>

                 {/* Buttons */}
                 <div className="flex gap-4 mt-4">
                     <button onClick={handleAddToCart} className="flex-1 max-w-[220px] bg-orange-50 border border-orange-500 text-orange-500 h-12 rounded-sm font-medium flex items-center justify-center gap-2 hover:bg-orange-100 transition">
                         <ShoppingCart className="w-5 h-5" /> Thêm Vào Giỏ Hàng
                     </button>
                     <button onClick={() => {handleAddToCart(); router.push('/cart');}} className="flex-1 max-w-[180px] bg-orange-500 text-white h-12 rounded-sm font-medium hover:bg-orange-600 transition shadow-sm">
                         Mua Ngay
                     </button>
                 </div>
             </div>
          </div>

          {/* Product Description */}
          <div className="mt-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="bg-slate-50 p-3 mb-4 uppercase font-medium text-slate-700 text-lg">Mô tả sản phẩm</div>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line pl-4 text-sm">
                  {product.description || "Sản phẩm chất lượng cao, được phân phối chính hãng bởi Cainm Store. \n\nĐặc điểm nổi bật:\n- Thiết kế hiện đại\n- Chất liệu bền bỉ\n- Bảo hành 12 tháng"}
              </div>
          </div>
       </div>
    </div>
  );
}