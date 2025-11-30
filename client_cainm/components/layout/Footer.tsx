import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Cột 1 */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">CAINM STORE</h3>
            <p className="text-sm leading-relaxed mb-6">
              Thiên đường mua sắm trực tuyến với hàng ngàn sản phẩm chất lượng. Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho bạn.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Cột 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Liên Kết Nhanh</h4>
            <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-orange-500 transition">Trang Chủ</Link></li>
                <li><Link href="/products" className="hover:text-orange-500 transition">Sản Phẩm</Link></li>
                <li><Link href="/about" className="hover:text-orange-500 transition">Về Chúng Tôi</Link></li>
                <li><Link href="/contact" className="hover:text-orange-500 transition">Liên Hệ</Link></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Chính Sách</h4>
            <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Điều khoản dịch vụ</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Giao hàng & Vận chuyển</a></li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Liên Hệ</h4>
            <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>0909 123 456</span>
                </li>
                <li className="flex gap-3">
                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>support@cainm.com</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Cainm Store. All rights reserved. Designed by You.</p>
        </div>
      </div>
    </footer>
  );
}