import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  setCategory: (cat: string) => void;
  priceRange: number[];
  setPriceRange: (range: [number, number]) => void;
}

export default function FilterSidebar({ 
  categories, selectedCategory, setCategory, priceRange, setPriceRange 
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 sticky top-24">
      <div className="flex items-center gap-2 font-bold text-slate-800 mb-6 pb-3 border-b">
          <Filter className="w-5 h-5" /> BỘ LỌC TÌM KIẾM
      </div>
      
      {/* Danh mục */}
      <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Danh Mục</h3>
          <div className="space-y-2">
              {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group py-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCategory === cat ? 'border-orange-600' : 'border-slate-300 group-hover:border-orange-400'}`}>
                          {selectedCategory === cat && <div className="w-2.5 h-2.5 rounded-full bg-orange-600"></div>}
                      </div>
                      <input 
                          type="radio" 
                          name="category" 
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => setCategory(e.target.value)}
                          className="hidden"
                      />
                      <span className={`text-sm transition ${selectedCategory === cat ? 'font-bold text-slate-900' : 'text-slate-600 group-hover:text-orange-600'}`}>
                          {cat}
                      </span>
                  </label>
              ))}
          </div>
      </div>

      {/* Khoảng giá */}
      <div>
          <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Khoảng Giá</h3>
          <div className="space-y-3">
             <div className="flex items-center gap-2">
                 <span className="text-xs text-slate-500 w-8">Từ:</span>
                 <input 
                    type="number" 
                    className="w-full p-2 border border-slate-200 rounded text-sm focus:border-orange-500 outline-none bg-slate-50"
                    placeholder="0"
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                 />
             </div>
             <div className="flex items-center gap-2">
                 <span className="text-xs text-slate-500 w-8">Đến:</span>
                 <input 
                    type="number" 
                    className="w-full p-2 border border-slate-200 rounded text-sm focus:border-orange-500 outline-none bg-slate-50"
                    placeholder="MAX"
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                 />
             </div>
             <button className="w-full mt-2 bg-slate-800 text-white text-xs py-2.5 rounded font-bold hover:bg-orange-600 transition uppercase">
                 Áp dụng
             </button>
          </div>
      </div>
    </div>
  );
}