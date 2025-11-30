import Image from 'next/image';
import { Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
         <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center flex-col text-white text-center p-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Về Chúng Tôi</h1>
            <p className="text-lg md:text-xl max-w-2xl">Cainm Store - Nơi kiến tạo phong cách sống hiện đại và đẳng cấp.</p>
         </div>
         {/* Ảnh nền banner (Dùng ảnh Unsplash) */}
         <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600" alt="About Banner" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 py-16">
         {/* Story Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 relative inline-block">
                    Câu Chuyện Của Chúng Tôi
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-orange-500 rounded"></span>
                </h2>
                <p className="text-slate-600 leading-relaxed">
                    Được thành lập vào năm 2024, Cainm Store bắt đầu với một sứ mệnh đơn giản: mang đến những sản phẩm chất lượng nhất với trải nghiệm mua sắm tuyệt vời nhất cho người Việt.
                </p>
                <p className="text-slate-600 leading-relaxed">
                    Chúng tôi không chỉ bán hàng, chúng tôi trao đi giá trị. Mỗi sản phẩm trên kệ đều được tuyển chọn kỹ lưỡng, đảm bảo nguồn gốc và chất lượng vượt trội.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <h4 className="font-bold text-2xl text-orange-600 mb-1">10K+</h4>
                        <p className="text-sm text-slate-600">Khách hàng tin dùng</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-2xl text-blue-600 mb-1">500+</h4>
                        <p className="text-sm text-slate-600">Sản phẩm chính hãng</p>
                    </div>
                </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600" alt="Team" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
            </div>
         </div>

         {/* Core Values */}
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Giá Trị Cốt Lõi</h2>
            <p className="text-slate-500">Điều làm nên sự khác biệt của Cainm Store</p>
         </div>

         <div className="grid md:grid-cols-4 gap-6">
            {[
                { icon: Award, title: "Chất Lượng", desc: "Cam kết hàng chính hãng 100%", color: "text-yellow-500", bg: "bg-yellow-50" },
                { icon: Users, title: "Tận Tâm", desc: "Hỗ trợ khách hàng 24/7", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: Globe, title: "Toàn Cầu", desc: "Vận chuyển khắp mọi nơi", color: "text-green-500", bg: "bg-green-50" },
                { icon: Heart, title: "Đam Mê", desc: "Làm việc bằng cả trái tim", color: "text-red-500", bg: "bg-red-50" },
            ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-slate-100 text-center group">
                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition`}>
                        <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}