'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/api/client';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';
import { ChevronRight, List, Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Điện thoại & Tablet', icon: '📱' },
  { id: 2, name: 'Máy tính & Laptop', icon: '💻' },
  { id: 3, name: 'Phụ kiện điện tử', icon: '🎧' },
  { id: 4, name: 'Đồng hồ thông minh', icon: '⌚' },
  { id: 5, name: 'Gia dụng thông minh', icon: '🏠' },
  { id: 6, name: 'Thời trang nam', icon: '👔' },
  { id: 7, name: 'Thời trang nữ', icon: '👗' },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    client.get('/products').then(res => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <div className="pb-10">
      
      {/* 1. HERO SECTION: Menu + Banner */}
      <div className="bg-white border-b">
        <div className="container py-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar Menu */}
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                 <div className="bg-white border rounded-lg shadow-sm overflow-hidden h-full">
                    <div className="bg-primary text-white px-4 py-3 font-bold flex items-center gap-2 uppercase text-sm">
                       <List className="w-5 h-5" /> Danh Mục
                    </div>
                    <ul className="py-2">
                       {categories.map(cat => (
                          <li key={cat.id}>
                             <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-primary transition">
                                <span className="flex items-center gap-2"><span>{cat.icon}</span> {cat.name}</span>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                             </Link>
                          </li>
                       ))}
                       <li>
                          <Link href="/products" className="block px-4 py-2.5 text-sm text-center text-primary font-medium hover:underline">
                             Xem tất cả danh mục
                          </Link>
                       </li>
                    </ul>
                 </div>
              </div>

              {/* Main Banner Slider */}
              <div className="lg:col-span-9 xl:col-span-10 relative group rounded-xl overflow-hidden shadow-md h-[300px] md:h-[400px]">
                  <Image 
                     src="https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sales_23-2150867345.jpg" 
                     alt="Banner" 
                     fill 
                     className="object-cover"
                     priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8 md:px-16">
                     <div className="text-white max-w-lg space-y-4">
                        <span className="bg-secondary text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Khuyến mãi hot</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">SIÊU SALE CÔNG NGHỆ <br/> GIẢM ĐẾN 50%</h2>
                        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold shadow-lg transition transform hover:-translate-y-1">
                           MUA NGAY
                        </button>
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. FEATURES / SERVICES */}
      <div className="container py-8">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            {[
               { icon: Truck, title: "Miễn phí vận chuyển", desc: "Đơn hàng từ 500k" },
               { icon: ShieldCheck, title: "Bảo hành chính hãng", desc: "Cam kết 100%" },
               { icon: RefreshCw, title: "Đổi trả trong 30 ngày", desc: "Lỗi là đổi mới" },
               { icon: Zap, title: "Giao hàng hỏa tốc", desc: "Nhận trong 2h" },
            ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-4 p-2">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                     <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                     <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 3. FLASH SALE */}
      <div className="container mb-10">
         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
               <h2 className="text-2xl font-bold text-slate-800 uppercase flex items-center gap-2">
                  <span className="text-secondary">⚡</span> Flash Sale
               </h2>
               <div className="flex gap-1 text-sm font-mono">
                  <span className="bg-slate-800 text-white px-1.5 py-0.5 rounded">02</span>:
                  <span className="bg-slate-800 text-white px-1.5 py-0.5 rounded">15</span>:
                  <span className="bg-slate-800 text-white px-1.5 py-0.5 rounded">45</span>
               </div>
            </div>
            <Link href="/products" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
               Xem tất cả <ChevronRight className="w-4 h-4" />
            </Link>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map(p => (
               <ProductCard key={p.id} product={p} />
            ))}
         </div>
      </div>

      {/* 4. GỢI Ý HÔM NAY */}
      <div className="bg-white py-10">
         <div className="container">
            <div className="text-center mb-10">
               <h2 className="text-2xl font-bold text-slate-800 uppercase inline-block border-b-4 border-primary pb-1">Gợi Ý Hôm Nay</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {products.map(p => (
                  <ProductCard key={p.id} product={p} />
               ))}
            </div>

            <div className="mt-12 text-center">
               <Link href="/products" className="inline-block px-10 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-full hover:border-primary hover:text-primary hover:bg-blue-50 transition">
                  Xem Thêm Sản Phẩm
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}