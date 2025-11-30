import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Banner Lớn (Slider) */}
        <div className="lg:col-span-8 relative h-[200px] sm:h-[300px] md:h-[360px] rounded-lg overflow-hidden group">
          {/* Giả lập Slider: Ở đây mình để 1 ảnh, bạn có thể cài swiper để làm slider thật */}
          <Link href="/products">
             <div className="w-full h-full relative">
                <Image 
                    src="https://cf.shopee.vn/file/vn-50009109-3d520564f1d79e03772f3838759389d2_xxhdpi" 
                    alt="Banner 1" 
                    fill 
                    className="object-cover"
                    priority
                />
             </div>
          </Link>
        </div>

        {/* 2 Banner Nhỏ bên phải */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 h-[360px]">
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <Image 
                src="https://cf.shopee.vn/file/vn-50009109-062a649e6270c0d6278244912c072997_xhdpi" 
                alt="Banner Small 1" 
                fill 
                className="object-cover"
            />
          </div>
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <Image 
                src="https://cf.shopee.vn/file/vn-50009109-d283470e2a400761a105c20248036a77_xhdpi" 
                alt="Banner Small 2" 
                fill 
                className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Banner tiện ích nhỏ dưới (Freeship, Hoàn xu...) */}
      <div className="grid grid-cols-4 gap-2 mt-4 bg-white p-4 rounded-lg shadow-sm text-xs sm:text-sm text-center">
        {[
            { icon: "🚚", text: "Miễn Phí Vận Chuyển" },
            { icon: "💰", text: "Hoàn Xu Xtra" },
            { icon: "shield", text: "Hàng Chính Hãng" },
            { icon: "⚡", text: "Giao Nhanh 2H" }
        ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer hover:text-orange-600">
                <span className="text-2xl">{item.icon}</span>
                <span>{item.text}</span>
            </div>
        ))}
      </div>
    </div>
  );
}